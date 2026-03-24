import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealtimeSyncService {
  private syncSubject = new Subject<{ table: string, payload: any }>();
  sync$ = this.syncSubject.asObservable();

  constructor(private supabase: SupabaseService) {}

  initGlobalSubscription() {
    this.supabase.client.channel('global-sync')
      .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
        this.syncSubject.next({ table: payload.table, payload });
      })
      .subscribe();
  }
}