import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, CartService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService    = inject(CartService);
  private route          = inject(ActivatedRoute);
  authService            = inject(AuthService);

  product: any;
  quantity  = 1;
  feedback  = '';

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(id).subscribe(data => {
      this.product = data;
      this.quantity = 1;
    });
  }

  get isPromo(): boolean {
    return this.product?.isPromotion === true;
  }

  get discountedPrice(): number {
    if (!this.product) return 0;
    return this.product.price * (1 - this.product.discountPercentage / 100);
  }

  get pricePerUnit(): number {
    if (!this.product) return 0;
    const base = this.isPromo ? this.discountedPrice : this.product.price;
    return this.product.packSize > 0 ? base / this.product.packSize : base;
  }

  get currentTotal(): number {
    if (!this.product) return 0;
    const price = (this.product.discountPercentage ?? 0) > 0 ? this.discountedPrice : this.product.price;
    return price * this.quantity;
  }

  setQty(delta: number) {
    const next = this.quantity + delta;
    if (next < 1 || next > this.product?.stockQuantity) return;
    this.quantity = next;
  }

  addToCart() {
    if (!this.product?.id) return;
    this.cartService.addToCart(this.product.id, this.quantity).subscribe({
      next: () => {
        this.feedback = 'Adicionado ao carrinho!';
        this.quantity = 1;
        setTimeout(() => this.feedback = '', 3000);
      },
      error: () => {
        this.feedback = 'Erro ao adicionar ao carrinho.';
        setTimeout(() => this.feedback = '', 3000);
      }
    });
  }
}
