import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ThemeService } from '../theme.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isSidebarCollapsed = false;

  constructor(
    public themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const savedSidebar = localStorage.getItem('hakari_sidebar_collapsed');
    if (savedSidebar === 'true') {
      this.isSidebarCollapsed = true;
    }
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    localStorage.setItem('hakari_sidebar_collapsed', String(this.isSidebarCollapsed));
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }
}