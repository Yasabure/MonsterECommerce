import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CartDrawerService {
  private cartService = inject(CartService);

  isOpen$ = new BehaviorSubject<boolean>(false);
  cart$   = new BehaviorSubject<any>(null);

  get itemCount(): number {
    const c = this.cart$.value;
    return c?.items?.reduce((s: number, i: any) => s + i.quantity, 0) ?? 0;
  }

  open() {
    this.refresh();
    this.isOpen$.next(true);
  }

  close() {
    this.isOpen$.next(false);
  }

  refresh() {
    this.cartService.getCart().subscribe({ next: c => this.cart$.next(c), error: () => {} });
  }
}
