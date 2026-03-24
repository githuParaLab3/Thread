import { Injectable } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private supabaseService: SupabaseService) {}

  async getNotes(campaignId: string) {
    return this.supabaseService.client
      .from('notes')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('title', { ascending: true });
  }

  async getNote(id: string) {
    return this.supabaseService.client
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();
  }

  async createNote(campaignId: string, title: string, type: string) {
    return this.supabaseService.client
      .from('notes')
      .insert([{ campaign_id: campaignId, title, type }])
      .select();
  }

  async updateNote(id: string, updates: any) {
    return this.supabaseService.client
      .from('notes')
      .update(updates)
      .eq('id', id)
      .select();
  }

  async deleteNote(id: string) {
    return this.supabaseService.client
      .from('notes')
      .delete()
      .eq('id', id);
  }
}