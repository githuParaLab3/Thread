import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MonsterService } from '../monster.service';
import { ContextService } from '../../../../core/context.service';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.css']
})
export class MonsterListComponent implements OnInit {
  monsters: any[] = [];
  filteredMonsters: any[] = [];
  searchTerm: string = '';

  constructor(
    private monsterService: MonsterService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  async ngOnInit() {
    await this.loadMonsters();
  }

  async loadMonsters() {
    const { data } = await this.monsterService.getMonsters();
    if (data) {
      this.monsters = data;
      this.filteredMonsters = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredMonsters = this.monsters;
      return;
    }
    this.filteredMonsters = this.monsters.filter(monster =>
      monster.name.toLowerCase().includes(term)
    );
  }

  async createNewMonster() {
    const name = prompt('Nome do Monstro:');
    if (!name) return;
    await this.monsterService.createMonster(name);
    await this.loadMonsters();
  }

  openMonster(monsterId: string) {
    this.router.navigate(['../monster', monsterId], { relativeTo: this.route });
  }

  openInContext(event: Event, monster: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'monster', data: monster });
  }
}