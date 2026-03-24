import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../location.service';
import { ContextService } from '../../../../core/context.service';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations: any[] = [];
  filteredLocations: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadLocations();
    }
  }

  async loadLocations() {
    if (!this.campaignId) return;
    const { data } = await this.locationService.getLocations(this.campaignId);
    if (data) {
      this.locations = data;
      this.filteredLocations = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredLocations = this.locations;
      return;
    }
    this.filteredLocations = this.locations.filter(location =>
      location.name.toLowerCase().includes(term) ||
      (location.type && location.type.toLowerCase().includes(term))
    );
  }

  async createNewLocation() {
    if (!this.campaignId) return;
    const name = prompt('Nome do Local:');
    if (!name) return;
    const type = prompt('Tipo (ex: Cidade, Masmorra, Taverna):') || '';
    await this.locationService.createLocation(this.campaignId, name, type);
    await this.loadLocations();
  }

  openLocation(locationId: string) {
    this.router.navigate(['../location', locationId], { relativeTo: this.route });
  }

  openInContext(event: Event, location: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'location', data: location });
  }
}