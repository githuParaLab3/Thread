import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
  sessions: any[] = [];
  filteredSessions: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadSessions();
    }
  }

  async loadSessions() {
    if (!this.campaignId) return;
    const { data } = await this.sessionService.getSessions(this.campaignId);
    if (data) {
      this.sessions = data;
      this.filteredSessions = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredSessions = this.sessions;
      return;
    }
    this.filteredSessions = this.sessions.filter(session =>
      session.title.toLowerCase().includes(term) ||
      (session.summary && session.summary.toLowerCase().includes(term))
    );
  }

  async createNewSession() {
    if (!this.campaignId) return;
    const number = this.sessions.length + 1;
    const title = prompt('Título da Sessão:');
    if (!title) return;
    
    const summary = prompt('Resumo curto:');
    await this.sessionService.createSession(this.campaignId, number, title, summary || '');
    await this.loadSessions();
  }

  openSession(sessionId: string) {
    this.router.navigate(['../session', sessionId], { relativeTo: this.route });
  }
}