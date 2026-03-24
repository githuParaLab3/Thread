import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResourceService } from '../resource.service';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-resource-view',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe, ConfirmModalComponent],
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.css']
})
export class ResourceViewComponent implements OnInit {
  resource: any = null;
  isDeleteModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('resourceId');
    if (id) {
      const { data } = await this.resourceService.getResource(id);
      this.resource = data;
    }
  }

  async saveResource() {
    if (this.resource) {
      await this.resourceService.updateResource(this.resource.id, this.resource);
    }
  }

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  async confirmDelete() {
    if (this.resource) {
      await this.resourceService.deleteResource(this.resource.id);
      this.router.navigate(['../../resources'], { relativeTo: this.route });
    }
  }
}