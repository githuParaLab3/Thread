import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityLinkService } from '../../services/entity-link.service';

@Component({
  selector: 'app-relation-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relation-panel.component.html',
  styleUrls: ['./relation-panel.component.css']
})
export class RelationPanelComponent implements OnInit {
  @Input() entityType!: string;
  @Input() entityId!: string;
  
  relations: any[] = [];

  constructor(private entityLinkService: EntityLinkService) {}

  async ngOnInit() {
    if (this.entityId && this.entityType) {
      await this.loadLinks();
    }
  }

  async loadLinks() {
    const { data } = await this.entityLinkService.getLinks(this.entityType, this.entityId);
    if (data) {
      const resolvedRelations = [];
      for (const link of data) {
        const tableName = link.target_type === 'note' ? 'notes' : link.target_type + 's';
        const name = await this.entityLinkService.getEntityName(tableName, link.target_id);
        resolvedRelations.push({
          id: link.id,
          type: link.target_type,
          name: name 
        });
      }
      this.relations = resolvedRelations;
    }
  }

  async addLink() {
    const targetType = prompt('Target type (npc, location, item, note, session):');
    if (!targetType) return;
    const targetId = prompt('Target ID:');
    if (!targetId) return;

    await this.entityLinkService.createLink(this.entityType, this.entityId, targetType, targetId);
    await this.loadLinks();
  }
}