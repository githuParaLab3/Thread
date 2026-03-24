import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MonsterService } from '../monster.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-monster-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './monster-view.component.html',
  styleUrls: ['./monster-view.component.css']
})
export class MonsterViewComponent implements OnInit {
  monster: any = null;
  isDeleteModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monsterService: MonsterService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('monsterId');
    if (id) {
      const { data } = await this.monsterService.getMonster(id);
      this.monster = data;
    }
  }

  async saveMonster() {
    if (this.monster) {
      await this.monsterService.updateMonster(this.monster.id, this.monster);
    }
  }

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  async confirmDelete() {
    if (this.monster) {
      await this.monsterService.deleteMonster(this.monster.id);
      this.router.navigate(['../../monsters'], { relativeTo: this.route });
    }
  }
}