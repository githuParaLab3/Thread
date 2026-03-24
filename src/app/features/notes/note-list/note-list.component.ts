import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../note.service';
import { ContextService } from '../../../core/context.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: any[] = [];
  filteredNotes: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadNotes();
    }
  }

  async loadNotes() {
    if (!this.campaignId) return;
    const { data } = await this.noteService.getNotes(this.campaignId);
    if (data) {
      this.notes = data;
      this.filteredNotes = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredNotes = this.notes;
      return;
    }
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(term) ||
      (note.type && note.type.toLowerCase().includes(term))
    );
  }

  async createNewNote() {
    if (!this.campaignId) return;
    const title = prompt('Título da Nota:');
    if (!title) return;
    const type = prompt('Tipo (lore, event, consequence, idea):') || 'lore';
    await this.noteService.createNote(this.campaignId, title, type);
    await this.loadNotes();
  }

  openNote(noteId: string) {
    this.router.navigate(['../note', noteId], { relativeTo: this.route });
  }

  openInContext(event: Event, note: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'note', data: note });
  }
}