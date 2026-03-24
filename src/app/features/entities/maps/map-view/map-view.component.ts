import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MapService } from '../map.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  mapData: any = null;
  isDeleteModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mapService: MapService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('mapId');
    if (id) {
      const { data } = await this.mapService.getMap(id);
      this.mapData = data;
    }
  }

  async saveMap() {
    if (this.mapData) {
      await this.mapService.updateMap(this.mapData.id, this.mapData);
    }
  }

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  async confirmDelete() {
    if (this.mapData) {
      await this.mapService.deleteMap(this.mapData.id);
      this.router.navigate(['../../maps'], { relativeTo: this.route });
    }
  }
}