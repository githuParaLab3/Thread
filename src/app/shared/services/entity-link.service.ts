import { Injectable } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class EntityLinkService {
  constructor(private supabaseService: SupabaseService) {}

  async getLinks(sourceType: string, sourceId: string) {
    return this.supabaseService.client
      .from('entity_links')
      .select('*')
      .eq('source_type', sourceType)
      .eq('source_id', sourceId);
  }

  async createLink(sourceType: string, sourceId: string, targetType: string, targetId: string) {
    return this.supabaseService.client
      .from('entity_links')
      .insert([{ 
        source_type: sourceType, 
        source_id: sourceId, 
        target_type: targetType, 
        target_id: targetId 
      }])
      .select();
  }
  
  async getEntityName(table: string, id: string) {
    const { data } = await this.supabaseService.client
      .from(table)
      .select('name, title')
      .eq('id', id)
      .single();
      
    if (data) {
      return data.name || data.title || id;
    }
    return id;
  }
}