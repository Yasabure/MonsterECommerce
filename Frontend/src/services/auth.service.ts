import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5076/api/Auth';

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  register(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  sendCode(email: string, type: string) {
    return this.http.post<any>(`${this.apiUrl}/send-code`, { email, type });
  }

  resetPassword(dto: { email: string; code: string; newPassword: string }) {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, dto);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  get isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  get user() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
