import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private supabaseService: SupabaseService) {}

  async getMaps(campaignId: string) {
    return this.supabaseService.client
      .from('maps')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('name', { ascending: true });
  }

  async getMap(id: string) {
    return this.supabaseService.client
      .from('maps')
      .select('*')
      .eq('id', id)
      .single();
  }

  async createMap(campaignId: string, name: string, type: string) {
    return this.supabaseService.client
      .from('maps')
      .insert([{ campaign_id: campaignId, name, type }])
      .select();
  }

  async updateMap(id: string, updates: any) {
    return this.supabaseService.client
      .from('maps')
      .update(updates)
      .eq('id', id)
      .select();
  }

  async deleteMap(id: string) {
    return this.supabaseService.client
      .from('maps')
      .delete()
      .eq('id', id);
  }
}