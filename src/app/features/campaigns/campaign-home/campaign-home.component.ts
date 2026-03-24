import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaignService } from '../campaign.service';
import { SupabaseService } from '../../../core/supabase.service';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-campaign-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ConfirmModalComponent],
  templateUrl: './campaign-home.component.html',
  styleUrls: ['./campaign-home.component.css']
})
export class CampaignHomeComponent implements OnInit {
  campaign: any = null;
  isDeleteModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const { data } = await this.campaignService.getCampaign(id);
      this.campaign = data;
    }
  }

  async saveCampaign() {
    if (this.campaign) {
      await this.campaignService.updateCampaign(this.campaign.id, {
        name: this.campaign.name,
        description: this.campaign.description
      });
    }
  }

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  async confirmDelete() {
    if (this.campaign) {
      await this.campaignService.deleteCampaign(this.campaign.id);
      this.router.navigate(['/dashboard']);
    }
  }

  async exportCampaignData() {
    if (!this.campaign) return;

    const tables = [
      'sessions', 'notes', 'npcs', 'locations', 'items', 
      'characters', 'encounters', 'maps', 'resources'
    ];
    
    const exportData: any = {
      manifest: {
        timestamp: new Date().toISOString(),
        version: 'HAKARI_1.0'
      },
      campaign: this.campaign
    };

    for (const table of tables) {
      const { data } = await this.supabaseService.client
        .from(table)
        .select('*')
        .eq('campaign_id', this.campaign.id);
      exportData[table] = data || [];
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `HAKARI_EXPORT_${this.campaign.name.replace(/\s+/g, '_').toUpperCase()}_${Date.now()}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }
}