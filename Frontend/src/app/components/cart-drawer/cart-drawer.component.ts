import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartDrawerService } from '../../../services/cart-drawer.service';
import { CartService } from '../../../services/api.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.css'
})
export class CartDrawerComponent {
  drawerService = inject(CartDrawerService);
  private cartService = inject(CartService);

  updateQty(productId: number, quantity: number) {
    if (quantity < 1) {
      this.cartService.removeFromCart(productId).subscribe(() => this.drawerService.refresh());
    } else {
      this.cartService.updateQuantity(productId, quantity).subscribe(() => this.drawerService.refresh());
    }
  }
}
