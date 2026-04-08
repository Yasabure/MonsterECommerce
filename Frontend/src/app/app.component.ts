import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { CartDrawerService } from '../services/cart-drawer.service';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, CartDrawerComponent],
  template: `
    <!-- ===== NAVBAR ===== -->
    <nav class="navbar navbar-dark navbar-expand-lg site-nav">
      <div class="container-fluid px-4 px-lg-5">

        <a class="nav-logo" routerLink="/">
          <img src="assets/monster-logo.webp" alt="" class="nav-logo-img">
        </a>

        <button class="navbar-toggler border-0 shadow-none" type="button"
                data-bs-toggle="collapse" data-bs-target="#navMain"
                aria-controls="navMain" aria-expanded="false" aria-label="Menu">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navMain">
          <ul class="navbar-nav mx-auto gap-lg-2 py-3 py-lg-0">
            <li class="nav-item">
              <a class="site-nav-link" routerLink="/"
                 routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">PRODUTOS</a>
            </li>
            <li class="nav-item">
              <a class="site-nav-link" routerLink="/promocoes" routerLinkActive="active">PROMOÇÕES</a>
            </li>
            <li class="nav-item">
              <a class="site-nav-link" routerLink="/sobre" routerLinkActive="active">SOBRE</a>
            </li>
          </ul>

          <div class="d-flex align-items-center gap-3 pb-3 pb-lg-0 justify-content-end">

            <a routerLink="/busca" class="nav-icon-btn" title="Buscar">
              <i class="bi bi-search"></i>
            </a>

            <div class="dropdown">
              <button class="nav-icon-btn dropdown-toggle" data-bs-toggle="dropdown"
                      aria-expanded="false" title="Minha conta">
                <i class="bi bi-person"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                <ng-container *ngIf="!authService.isLoggedIn">
                  <li><a class="dropdown-item" routerLink="/login">Entrar</a></li>
                  <li><a class="dropdown-item" routerLink="/cadastro">Cadastrar</a></li>
                </ng-container>
                <ng-container *ngIf="authService.isLoggedIn">
                  <li>
                    <span class="dropdown-item-text fw-bold" style="color:#84bd00; font-size:.85rem;">
                      {{ authService.user?.name }}
                    </span>
                  </li>
                  <li *ngIf="authService.user?.role === 'Admin'">
                    <a class="dropdown-item" routerLink="/admin">
                      <i class="bi bi-gear me-2"></i>Admin
                    </a>
                  </li>
                  <li><a class="dropdown-item" routerLink="/orders">
                    <i class="bi bi-box-seam me-2"></i>Meus Pedidos
                  </a></li>
                  <li><hr class="dropdown-divider" style="border-color:#2a2a2a;"></li>
                  <li>
                    <a class="dropdown-item text-danger" style="cursor:pointer" (click)="logout()">
                      <i class="bi bi-box-arrow-right me-2"></i>Sair
                    </a>
                  </li>
                </ng-container>
              </ul>
            </div>

            <button class="nav-icon-btn position-relative" (click)="cartDrawer.open()"
                    *ngIf="authService.isLoggedIn" title="Carrinho">
              <i class="bi bi-cart2"></i>
              <span class="cart-count" *ngIf="cartDrawer.itemCount > 0">{{ cartDrawer.itemCount }}</span>
            </button>

          </div>
        </div>
      </div>
    </nav>

    <!-- ===== CART DRAWER ===== -->
    <app-cart-drawer></app-cart-drawer>

    <!-- ===== CONTEÚDO ===== -->
    <div class="site-content">
      <router-outlet></router-outlet>
    </div>

    <!-- ===== FOOTER ===== -->
    <footer class="site-footer">
      <div class="container py-5">
        <div class="row g-5">
          <div class="col-lg-5">
            <img src="assets/monster-logo.webp" alt="" class="footer-logo-img mb-3">
            <p class="footer-tagline">A energia que você precisa para viver no limite.</p>
          </div>
          <div class="col-lg-3 col-md-6">
            <h6 class="footer-heading">LOJA</h6>
            <ul class="footer-links">
              <li><a routerLink="/">Todos os Produtos</a></li>
              <li><a routerLink="/promocoes">Promoções</a></li>
              <li><a routerLink="/sobre">Sobre</a></li>
            </ul>
          </div>
        </div>
        <hr style="border-color:#1a1a1a; margin: 2rem 0 1.5rem;">
        <div class="text-center" style="color:#3a3a3a; font-size:.8rem;">
          <p class="mb-1">© 2026 Monster Energy Store. Todos os direitos reservados.</p>
          <p class="mb-0" style="color:#2a2a2a;">
            Desenvolvido por <span style="color:#555;">Leonardo Dias</span> &amp; <span style="color:#555;">Sarah Tambalo</span>
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; min-height: 100vh; }

    /* ---- Navbar ---- */
    .site-nav {
      background: #000 !important;
      border-bottom: 1px solid #111;
      position: sticky;
      top: 0;
      z-index: 1030;
    }
    .nav-logo {
      text-decoration: none;
      margin-right: 2rem;
      display: flex;
      align-items: center;
    }
    .nav-logo-img {
      height: 36px;
      width: auto;
    }
    .site-nav-link {
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #aaa;
      text-decoration: none;
      padding: 0.4rem 0.75rem;
      border-radius: 4px;
      transition: color 0.2s;
      display: block;
    }
    .site-nav-link:hover, .site-nav-link.active { color: #84bd00; }

    .nav-icon-btn {
      background: none;
      border: none;
      color: #aaa;
      font-size: 1.15rem;
      cursor: pointer;
      padding: 0;
      line-height: 1;
      text-decoration: none;
      transition: color 0.2s;
      position: relative;
    }
    .nav-icon-btn:hover { color: #84bd00; }
    .nav-icon-btn.dropdown-toggle::after { display: none; }

    .cart-count {
      position: absolute;
      top: -7px;
      right: -9px;
      background: #84bd00;
      color: #000;
      font-size: 0.58rem;
      font-weight: 700;
      border-radius: 50%;
      min-width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Dropdown override */
    .dropdown-menu-dark {
      background: #111 !important;
      border: 1px solid #222 !important;
      border-radius: 8px;
      min-width: 180px;
    }
    .dropdown-menu-dark .dropdown-item { color: #ccc; font-size: .9rem; }
    .dropdown-menu-dark .dropdown-item:hover { background: #1e1e1e; color: #fff; }

    /* ---- Content ---- */
    .site-content { flex: 1 1 auto; overflow-x: hidden; }

    /* ---- Footer ---- */
    .site-footer {
      background: #050505;
      border-top: 1px solid #111;
    }
    .footer-logo-img {
      height: 40px;
      width: auto;
      display: block;
    }
    .footer-tagline { color: #555; font-size: .85rem; max-width: 280px; }
    .footer-heading {
      color: #84bd00;
      font-weight: 700;
      letter-spacing: 0.08em;
      font-size: .72rem;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    .footer-links { list-style: none; padding: 0; margin: 0; }
    .footer-links li { margin-bottom: .55rem; }
    .footer-links a { color: #666; text-decoration: none; font-size: .88rem; transition: color .2s; }
    .footer-links a:hover { color: #fff; }
  `]
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  cartDrawer  = inject(CartDrawerService);

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.cartDrawer.refresh();
    }
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }
}
