import { Injectable } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  constructor(private supabaseService: SupabaseService) {}

  async getCampaigns() {
    return this.supabaseService.client
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });
  }

  async getCampaign(id: string) {
    return this.supabaseService.client
      .from('campaigns')
      .select('*')
      .eq('id', id)
      .single();
  }

  async createCampaign(name: string, description: string, userId: string) {
    return this.supabaseService.client
      .from('campaigns')
      .insert([{ name, description, user_id: userId }])
      .select();
  }

  async updateCampaign(id: string, updates: any) {
    return this.supabaseService.client
      .from('campaigns')
      .update(updates)
      .eq('id', id)
      .select();
  }

  async deleteCampaign(id: string) {
    return this.supabaseService.client
      .from('campaigns')
      .delete()
      .eq('id', id);
  }
}