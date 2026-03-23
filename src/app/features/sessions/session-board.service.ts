import { Injectable } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class SessionBoardService {
  constructor(private supabaseService: SupabaseService) {}

  async getNodes(sessionId: string) {
    return this.supabaseService.client
      .from('session_boards')
      .select('*')
      .eq('session_id', sessionId);
  }

  async saveNode(sessionId: string, title: string, x: number, y: number) {
    return this.supabaseService.client
      .from('session_boards')
      .insert([{ session_id: sessionId, title, pos_x: x, pos_y: y }])
      .select();
  }

  async updateNodePosition(nodeId: string, x: number, y: number) {
    return this.supabaseService.client
      .from('session_boards')
      .update({ pos_x: x, pos_y: y })
      .eq('id', nodeId);
  }
}