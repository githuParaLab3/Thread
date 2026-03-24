import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../item.service';
import { ContextService } from '../../../../core/context.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadItems();
    }
  }

  async loadItems() {
    if (!this.campaignId) return;
    const { data } = await this.itemService.getItems(this.campaignId);
    if (data) {
      this.items = data;
      this.filteredItems = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredItems = this.items;
      return;
    }
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(term)
    );
  }

  async createNewItem() {
    if (!this.campaignId) return;
    const name = prompt('Nome do Item:');
    if (!name) return;
    const valueStr = prompt('Valor (ouro):') || '0';
    const value = parseFloat(valueStr) || 0;
    await this.itemService.createItem(this.campaignId, name, value);
    await this.loadItems();
  }

  openItem(itemId: string) {
    this.router.navigate(['../item', itemId], { relativeTo: this.route });
  }

  openInContext(event: Event, item: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'item', data: item });
  }
}