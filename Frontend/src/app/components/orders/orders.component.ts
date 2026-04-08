import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  orders: any[] = [];
  loading = true;

  ngOnInit() {
    this.orderService.getOrders().subscribe({
      next: (data) => { this.orders = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
