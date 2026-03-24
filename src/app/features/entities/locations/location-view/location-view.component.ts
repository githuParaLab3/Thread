import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../location.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-location-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.css']
})
export class LocationViewComponent implements OnInit {
  location: any = null;
  isDeleteModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('locationId');
    if (id) {
      const { data } = await this.locationService.getLocation(id);
      this.location = data;
    }
  }

  async saveLocation() {
    if (this.location) {
      await this.locationService.updateLocation(this.location.id, this.location);
    }
  }

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  async confirmDelete() {
    if (this.location) {
      await this.locationService.deleteLocation(this.location.id);
      this.router.navigate(['../../locations'], { relativeTo: this.route });
    }
  }
}