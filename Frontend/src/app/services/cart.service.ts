import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5076/api/Cart';

  getCart(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addToCart(productId: number, quantity: number = 1): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add?productId=${productId}&quantity=${quantity}`, {});
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/clear`);
  }
}
