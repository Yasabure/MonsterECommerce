import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService, CartService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { CartDrawerService } from '../../../services/cart-drawer.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService    = inject(CartService);
  private cartDrawer     = inject(CartDrawerService);
  private router         = inject(Router);
  authService            = inject(AuthService);

  products: any[]         = [];
  filteredProducts: any[] = [];
  selectedCategory        = '';
  loading                 = true;
  addingId: number | null = null;

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data.filter((p: any) => !p.isPromotion);
        this.filteredProducts = [...this.products];
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  get categories(): string[] {
    const cats = this.products.map(p => p.category).filter(Boolean);
    return [...new Set<string>(cats)];
  }

  selectCategory(cat: string) {
    this.selectedCategory = this.selectedCategory === cat ? '' : cat;
    this.filteredProducts = this.selectedCategory
      ? this.products.filter(p => p.category === this.selectedCategory)
      : [...this.products];
  }

  scrollToProducts() {
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
  }

  addToCart(productId: number) {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.addingId = productId;
    this.cartService.addToCart(productId, 1).subscribe({
      next: () => {
        this.addingId = null;
        this.cartDrawer.open();
      },
      error: () => {
        this.addingId = null;
        alert('Erro ao adicionar produto ao carrinho.');
      }
    });
  }
}
