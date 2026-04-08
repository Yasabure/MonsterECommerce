import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService, CartService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  authService = inject(AuthService);

  query = '';
  products: any[] = [];

  searchProducts() {
    if (!this.query.trim()) {
      this.products = [];
      return;
    }
    this.productService.search(this.query).subscribe({
      next: (data) => this.products = data,
      error: () => this.products = []
    });
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId).subscribe({
      next: () => alert('Produto adicionado ao carrinho!'),
      error: () => alert('Erro ao adicionar produto ao carrinho.')
    });
  }
}
