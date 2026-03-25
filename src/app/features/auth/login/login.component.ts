import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';
import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginMode = true;
  isForgotPasswordMode = false;
  email = '';
  password = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.isForgotPasswordMode = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  toggleForgotPassword() {
    this.isForgotPasswordMode = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelForgotPassword() {
    this.isForgotPasswordMode = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  async submitForm() {
    if (!this.email) {
      this.errorMessage = 'Email is required.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      if (this.isForgotPasswordMode) {
        const { error } = await this.authService.resetPasswordForEmail(this.email);
        if (error) throw error;
        this.successMessage = 'Password reset instructions sent to your email.';
      } else {
        if (!this.password) {
          this.errorMessage = 'Password is required.';
          this.loading = false;
          return;
        }

        if (this.isLoginMode) {
          const { error } = await this.authService.signInWithEmail(this.email, this.password);
          if (error) throw error;
          this.router.navigate(['/dashboard']);
        } else {
          const { error } = await this.authService.signUp(this.email, this.password);
          if (error) throw error;
          this.successMessage = 'Registration successful. Check your email for confirmation.';
          this.isLoginMode = true;
        }
      }
    } catch (err: any) {
      this.errorMessage = err.message || 'Operation failed.';
    } finally {
      this.loading = false;
    }
  }

  async loginWithGoogle() {
    this.loading = true;
    try {
      await this.authService.signInWithGoogle();
    } catch (err: any) {
      this.errorMessage = err.message;
      this.loading = false;
    }
  }
}