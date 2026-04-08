import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, CartService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { CartDrawerService } from '../../../services/cart-drawer.service';

@Component({
  selector: 'app-promocoes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './promocoes.component.html',
  styleUrl: './promocoes.component.css'
})
export class PromocoesComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  authService = inject(AuthService);
  private cartDrawer = inject(CartDrawerService);

  products: any[] = [];
  loading = true;
  addingId: number | null = null;

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data.filter((p: any) => p.discountPercentage > 0);
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  getDiscountedPrice(product: any): number {
    return product.price * (1 - product.discountPercentage / 100);
  }

  addToCart(productId: number) {
    this.addingId = productId;
    this.cartService.addToCart(productId, 1).subscribe({
      next: () => {
        this.addingId = null;
        this.cartDrawer.open();
      },
      error: () => {
        this.addingId = null;
        alert('Erro ao adicionar ao carrinho.');
      }
    });
  }
}
