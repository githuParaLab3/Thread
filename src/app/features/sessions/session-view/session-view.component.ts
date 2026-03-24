import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../session.service';
import { SessionBoardComponent } from '../session-board/session-board.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-session-view',
  standalone: true,
  imports: [CommonModule, FormsModule, SessionBoardComponent, ConfirmModalComponent],
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.css']
})
export class SessionViewComponent implements OnInit {
  session: any = null;
  isDeleteModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('sessionId');
    if (id) {
      const { data } = await this.sessionService.getSession(id);
      this.session = data;
    }
  }

  async saveSession() {
    if (this.session) {
      await this.sessionService.updateSession(this.session.id, this.session);
    }
  }

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  async confirmDelete() {
    if (this.session) {
      await this.sessionService.deleteSession(this.session.id);
      this.router.navigate(['../../sessions'], { relativeTo: this.route });
    }
  }
}