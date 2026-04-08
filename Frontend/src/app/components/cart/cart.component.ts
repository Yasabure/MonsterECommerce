import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../services/api.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private router = inject(Router);

  cart: any;
  loading = false;

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe(data => this.cart = data);
  }

  updateQty(productId: number, quantity: number) {
    if (quantity < 1) {
      this.removeItem(productId);
      return;
    }
    this.cartService.updateQuantity(productId, quantity).subscribe(() => this.loadCart());
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId).subscribe(() => this.loadCart());
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => this.loadCart());
  }
}
