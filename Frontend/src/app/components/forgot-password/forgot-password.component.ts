import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  step = 1;
  email = '';
  code = '';
  newPassword = '';
  confirmPassword = '';
  showPassword = false;
  showConfirm = false;
  errorMessage = '';
  successMessage = '';
  loading = false;

  sendCode() {
    this.loading = true;
    this.errorMessage = '';
    this.authService.sendCode(this.email, 'PasswordReset').subscribe({
      next: () => {
        this.successMessage = `Código enviado para ${this.email}`;
        this.step = 2;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao enviar código.';
        this.loading = false;
      }
    });
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.authService.resetPassword({ email: this.email, code: this.code, newPassword: this.newPassword }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Código inválido ou expirado.';
        this.loading = false;
      }
    });
  }

  backToStep1() {
    this.step = 1;
    this.code = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.showPassword = false;
    this.showConfirm = false;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
