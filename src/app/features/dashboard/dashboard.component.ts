import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CampaignService } from '../campaigns/campaign.service';
import { AuthService } from '../../core/auth.service';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  campaigns: any[] = [];
  filteredCampaigns: any[] = [];
  userId: string | undefined;
  searchTerm: string = '';

  constructor(
    private campaignService: CampaignService,
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  async ngOnInit() {
    const { data } = await this.authService.session;
    this.userId = data.session?.user.id;
    await this.loadCampaigns();
  }

  async loadCampaigns() {
    const { data, error } = await this.campaignService.getCampaigns();
    if (data) {
      this.campaigns = data;
      this.filteredCampaigns = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredCampaigns = this.campaigns;
      return;
    }
    this.filteredCampaigns = this.campaigns.filter(campaign =>
      campaign.name.toLowerCase().includes(term) ||
      (campaign.description && campaign.description.toLowerCase().includes(term))
    );
  }

  async createNewCampaign() {
    if (!this.userId) return;
    const name = prompt('Nome da campanha:');
    if (!name) return;
    
    const description = prompt('Descrição:');
    await this.campaignService.createCampaign(name, description || '', this.userId);
    await this.loadCampaigns();
  }

  openCampaign(id: string) {
    this.router.navigate(['/campaign', id]);
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }
}