import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EncounterService } from '../encounter.service';
import { ContextService } from '../../../../core/context.service';

@Component({
  selector: 'app-encounter-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './encounter-list.component.html',
  styleUrls: ['./encounter-list.component.css']
})
export class EncounterListComponent implements OnInit {
  encounters: any[] = [];
  filteredEncounters: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  constructor(
    private encounterService: EncounterService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadEncounters();
    }
  }

  async loadEncounters() {
    if (!this.campaignId) return;
    const { data } = await this.encounterService.getEncounters(this.campaignId);
    if (data) {
      this.encounters = data;
      this.filteredEncounters = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredEncounters = this.encounters;
      return;
    }
    this.filteredEncounters = this.encounters.filter(encounter =>
      encounter.name.toLowerCase().includes(term) ||
      (encounter.difficulty && encounter.difficulty.toLowerCase().includes(term))
    );
  }

  async createNewEncounter() {
    if (!this.campaignId) return;
    const name = prompt('Nome do Encontro:');
    if (!name) return;
    const difficulty = prompt('Dificuldade:') || 'Medium';
    await this.encounterService.createEncounter(this.campaignId, name, difficulty);
    await this.loadEncounters();
  }

  openEncounter(encounterId: string) {
    this.router.navigate(['../encounter', encounterId], { relativeTo: this.route });
  }

  openInContext(event: Event, encounter: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'encounter', data: encounter });
  }
}