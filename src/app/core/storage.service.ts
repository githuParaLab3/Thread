import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private supabase: SupabaseService) {}

  async uploadFile(campaignId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${campaignId}/${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error } = await this.supabase.client.storage
      .from('media')
      .upload(fileName, file);

    if (error) throw error;

    const { data } = this.supabase.client.storage
      .from('media')
      .getPublicUrl(fileName);

    return data.publicUrl;
  }
}