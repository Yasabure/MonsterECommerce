import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5076/api/Product';

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  search(name: string) {
    return this.http.get<any[]>(`${this.apiUrl}/search?name=${name}`);
  }

  // Admin
  create(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  update(id: number, data: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  uploadImage(file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/upload-image`, form);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5076/api/Cart';

  getCart() {
    return this.http.get<any>(this.apiUrl);
  }

  addToCart(productId: number, quantity: number = 1) {
    return this.http.post(`${this.apiUrl}/add?productId=${productId}&quantity=${quantity}`, {});
  }

  updateQuantity(productId: number, quantity: number) {
    return this.http.put(`${this.apiUrl}/update?productId=${productId}&quantity=${quantity}`, {});
  }

  removeFromCart(productId: number) {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }

  clearCart() {
    return this.http.delete(`${this.apiUrl}/clear`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5076/api/Order';

  checkout(paymentMethod: string) {
    return this.http.post<any>(`${this.apiUrl}/checkout?paymentMethod=${paymentMethod}`, {});
  }

  getMyOrders() {
    return this.http.get<any[]>(`${this.apiUrl}/my-orders`);
  }
}
