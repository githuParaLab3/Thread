import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../character.service';
import { ContextService } from '../../../../core/context.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadCharacters();
    }
  }

  async loadCharacters() {
    if (!this.campaignId) return;
    const { data } = await this.characterService.getCharacters(this.campaignId);
    if (data) {
      this.characters = data;
      this.filteredCharacters = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredCharacters = this.characters;
      return;
    }
    this.filteredCharacters = this.characters.filter(character =>
      character.name.toLowerCase().includes(term) ||
      (character.class && character.class.toLowerCase().includes(term))
    );
  }

  async createNewCharacter() {
    if (!this.campaignId) return;
    const name = prompt('Nome do Personagem:');
    if (!name) return;
    const charClass = prompt('Classe:') || '';
    await this.characterService.createCharacter(this.campaignId, name, charClass);
    await this.loadCharacters();
  }

  openCharacter(characterId: string) {
    this.router.navigate(['../character', characterId], { relativeTo: this.route });
  }

  openInContext(event: Event, character: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'character', data: character });
  }
}