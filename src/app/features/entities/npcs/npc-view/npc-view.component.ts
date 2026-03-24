import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NpcService } from '../npc.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-npc-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './npc-view.component.html',
  styleUrls: ['./npc-view.component.css']
})
export class NpcViewComponent implements OnInit {
  npc: any = null;
  isDeleteModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private npcService: NpcService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('npcId');
    if (id) {
      const { data } = await this.npcService.getNpc(id);
      this.npc = data;
    }
  }

  async saveNpc() {
    if (this.npc) {
      await this.npcService.updateNpc(this.npc.id, this.npc);
    }
  }

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  async confirmDelete() {
    if (this.npc) {
      await this.npcService.deleteNpc(this.npc.id);
      this.router.navigate(['../../npcs'], { relativeTo: this.route });
    }
  }
}