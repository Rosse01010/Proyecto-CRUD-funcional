import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="d-flex align-items-center justify-content-center" style="min-height: 80vh;">
      <div class="premium-card p-4 p-md-5 text-center fade-in mx-3 mx-md-0" style="max-width: 500px; width: 100%;">
        <div class="mb-4">
          <i class="bi bi-bus-front text-primary" style="font-size: 3.5rem;"></i>
        </div>
        <h2 class="mb-3 fw-bold">Sistema de VoyagePasss</h2>
        <p class="text-muted mb-4 mb-md-5">Bienvenido. Seleccione su rol para continuar gestionando sus viajes.</p>
        
        <div class="d-flex flex-column gap-3">
          <button class="btn btn-primary btn-lg shadow-sm w-100 rounded-pill" (click)="go('/admin/rutas')">
            <i class="bi bi-shield-lock me-2"></i> Administración
          </button>
          <button class="btn btn-outline-secondary btn-lg w-100 rounded-pill" (click)="go('/cajero')">
            <i class="bi bi-cash-coin me-2"></i> Cajero
          </button>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
  constructor(private router: Router) { }
  go(path: string) { this.router.navigate([path]); }
}
