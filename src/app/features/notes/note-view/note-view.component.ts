import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../note.service';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-note-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  note: any = null;
  isDeleteModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('noteId');
    if (id) {
      const { data } = await this.noteService.getNote(id);
      this.note = data;
    }
  }

  async saveNote() {
    if (this.note) {
      await this.noteService.updateNote(this.note.id, this.note);
    }
  }

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  async confirmDelete() {
    if (this.note) {
      await this.noteService.deleteNote(this.note.id);
      this.router.navigate(['../../notes'], { relativeTo: this.route });
    }
  }
}