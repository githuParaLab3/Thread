import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = true;

  constructor() {
    const saved = localStorage.getItem('hakari_theme');
    if (saved !== null) {
      this.isDarkMode = saved === 'true';
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('hakari_theme', String(this.isDarkMode));
    this.applyTheme();
  }

  private applyTheme() {
    const theme = this.isDarkMode ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', theme);
    
    document.body.classList.remove('dark-theme', 'light-theme', 'theme-dark', 'theme-light');
    document.body.classList.add(`${theme}-theme`);
    document.body.classList.add(`theme-${theme}`);
  }
}