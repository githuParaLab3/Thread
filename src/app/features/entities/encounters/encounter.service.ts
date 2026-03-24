import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class EncounterService {
  constructor(private supabaseService: SupabaseService) {}

  async getEncounters(campaignId: string) {
    return this.supabaseService.client
      .from('encounters')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('name', { ascending: true });
  }

  async getEncounter(id: string) {
    return this.supabaseService.client
      .from('encounters')
      .select('*')
      .eq('id', id)
      .single();
  }

  async createEncounter(campaignId: string, name: string, difficulty: string) {
    return this.supabaseService.client
      .from('encounters')
      .insert([{ campaign_id: campaignId, name, difficulty }])
      .select();
  }

  async updateEncounter(id: string, updates: any) {
    return this.supabaseService.client
      .from('encounters')
      .update(updates)
      .eq('id', id)
      .select();
  }

  async deleteEncounter(id: string) {
    return this.supabaseService.client
      .from('encounters')
      .delete()
      .eq('id', id);
  }
}