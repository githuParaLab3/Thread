import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MapService } from '../map.service';
import { ContextService } from '../../../../core/context.service';

@Component({
  selector: 'app-map-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css']
})
export class MapListComponent implements OnInit {
  maps: any[] = [];
  filteredMaps: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  constructor(
    private mapService: MapService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadMaps();
    }
  }

  async loadMaps() {
    if (!this.campaignId) return;
    const { data } = await this.mapService.getMaps(this.campaignId);
    if (data) {
      this.maps = data;
      this.filteredMaps = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredMaps = this.maps;
      return;
    }
    this.filteredMaps = this.maps.filter(mapItem =>
      mapItem.name.toLowerCase().includes(term) ||
      (mapItem.type && mapItem.type.toLowerCase().includes(term))
    );
  }

  async createNewMap() {
    if (!this.campaignId) return;
    const name = prompt('Nome do Mapa:');
    if (!name) return;
    const type = prompt('Tipo (Regional, Dungeon, Cidade):') || 'Regional';
    await this.mapService.createMap(this.campaignId, name, type);
    await this.loadMaps();
  }

  openMap(mapId: string) {
    this.router.navigate(['../map', mapId], { relativeTo: this.route });
  }

  openInContext(event: Event, mapData: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'map', data: mapData });
  }
}