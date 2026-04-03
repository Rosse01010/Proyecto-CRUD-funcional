import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    children: [
      { path: 'rutas', loadComponent: () => import('./admin/bus-routes/bus-routes.component').then(m => m.BusRoutesComponent) },
      { path: 'tickets', loadComponent: () => import('./admin/tickets/tickets.component').then(m => m.TicketsComponent) },
      { path: '', redirectTo: 'rutas', pathMatch: 'full' }
    ]
  },
  {
    path: 'cajero',
    loadComponent: () => import('./cashier/cashier.component').then(m => m.CashierComponent)
  },
  {
    path: 'cajero/ticket/:id',
    loadComponent: () => import('./cashier/ticket-receipt/ticket-receipt.component').then(m => m.TicketReceiptComponent)
  }
];
