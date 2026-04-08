import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  step = 1;
  userData = { name: '', email: '', password: '', code: '' };
  confirmPassword = '';
  showPassword = false;
  showConfirm = false;
  errorMessage = '';
  successMessage = '';
  loading = false;

  sendCode() {
    if (this.userData.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.authService.sendCode(this.userData.email, 'Register').subscribe({
      next: () => {
        this.successMessage = `Código enviado para ${this.userData.email}`;
        this.step = 2;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao enviar código.';
        this.loading = false;
      }
    });
  }

  register() {
    this.loading = true;
    this.errorMessage = '';
    this.authService.register(this.userData).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Código inválido ou expirado.';
        this.loading = false;
      }
    });
  }

  backToStep1() {
    this.step = 1;
    this.successMessage = '';
    this.errorMessage = '';
    this.userData.code = '';
  }
}
