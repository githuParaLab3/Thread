import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EncounterService } from '../encounter.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-encounter-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './encounter-view.component.html',
  styleUrls: ['./encounter-view.component.css']
})
export class EncounterViewComponent implements OnInit {
  encounter: any = null;
  isDeleteModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encounterService: EncounterService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('encounterId');
    if (id) {
      const { data } = await this.encounterService.getEncounter(id);
      this.encounter = data;
    }
  }

  async saveEncounter() {
    if (this.encounter) {
      await this.encounterService.updateEncounter(this.encounter.id, this.encounter);
    }
  }

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  async confirmDelete() {
    if (this.encounter) {
      await this.encounterService.deleteEncounter(this.encounter.id);
      this.router.navigate(['../../encounters'], { relativeTo: this.route });
    }
  }
}