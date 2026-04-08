import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService, OrderService } from '../../../services/api.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  cart: any;
  message = '';
  errorMessage = '';

  // Carrega os itens do carrinho
  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (data) => this.cart = data,
      error: () => this.errorMessage = 'Erro ao carregar o carrinho'
    });
  }

  finalizarCompra() {
    this.orderService.checkout('simulado').subscribe({
      next: () => {
        this.message = 'Pedido realizado com sucesso!';
        this.router.navigate(['/orders']);
      },
      error: () => this.errorMessage = 'Erro ao finalizar pedido.'
    });
  }
}
