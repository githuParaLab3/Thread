import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private supabase: SupabaseService) {}

  get session() {
    return this.supabase.client.auth.getSession();
  }

  authChanges(callback: (event: string, session: any) => void) {
    return this.supabase.client.auth.onAuthStateChange(callback);
  }

  async signInWithGoogle() {
    return this.supabase.client.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  async signInWithEmail(email: string, password: string) {
    return this.supabase.client.auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string) {
    return this.supabase.client.auth.signUp({ email, password });
  }

  async resetPasswordForEmail(email: string) {
    return this.supabase.client.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/update-password',
    });
  }

  async updateUserPassword(password: string) {
    return this.supabase.client.auth.updateUser({ password });
  }

  async signOut() {
    return this.supabase.client.auth.signOut();
  }
}