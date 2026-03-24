import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NpcService } from '../npc.service';
import { ContextService } from '../../../../core/context.service';

@Component({
  selector: 'app-npc-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './npc-list.component.html',
  styleUrls: ['./npc-list.component.css']
})
export class NpcListComponent implements OnInit {
  npcs: any[] = [];
  filteredNpcs: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  constructor(
    private npcService: NpcService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadNpcs();
    }
  }

  async loadNpcs() {
    if (!this.campaignId) return;
    const { data } = await this.npcService.getNpcs(this.campaignId);
    if (data) {
      this.npcs = data;
      this.filteredNpcs = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredNpcs = this.npcs;
      return;
    }
    this.filteredNpcs = this.npcs.filter(npc =>
      npc.name.toLowerCase().includes(term) ||
      (npc.role && npc.role.toLowerCase().includes(term))
    );
  }

  async createNewNpc() {
    if (!this.campaignId) return;
    const name = prompt('Nome do NPC:');
    if (!name) return;
    const role = prompt('Papel (ex: Mercador, Vilão):') || '';
    await this.npcService.createNpc(this.campaignId, name, role);
    await this.loadNpcs();
  }

  openNpc(npcId: string) {
    this.router.navigate(['../npc', npcId], { relativeTo: this.route });
  }

  openInContext(event: Event, npc: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'npc', data: npc });
  }
}