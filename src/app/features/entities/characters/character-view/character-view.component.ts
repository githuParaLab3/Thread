import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../character.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-character-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit {
  character: any = null;
  isDeleteModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('characterId');
    if (id) {
      const { data } = await this.characterService.getCharacter(id);
      this.character = data;
    }
  }

  async saveCharacter() {
    if (this.character) {
      await this.characterService.updateCharacter(this.character.id, this.character);
    }
  }

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  async confirmDelete() {
    if (this.character) {
      await this.characterService.deleteCharacter(this.character.id);
      this.router.navigate(['../../characters'], { relativeTo: this.route });
    }
  }
}