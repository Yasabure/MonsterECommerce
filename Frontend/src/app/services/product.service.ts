import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5076/api/Product';

  getAll(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  search(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?name=${encodeURIComponent(name)}`);
  }
}
