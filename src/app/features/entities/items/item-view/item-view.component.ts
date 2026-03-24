import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../item.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-item-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  item: any = null;
  isDeleteModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('itemId');
    if (id) {
      const { data } = await this.itemService.getItem(id);
      this.item = data;
    }
  }

  async saveItem() {
    if (this.item) {
      await this.itemService.updateItem(this.item.id, this.item);
    }
  }

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  async confirmDelete() {
    if (this.item) {
      await this.itemService.deleteItem(this.item.id);
      this.router.navigate(['../../items'], { relativeTo: this.route });
    }
  }
}