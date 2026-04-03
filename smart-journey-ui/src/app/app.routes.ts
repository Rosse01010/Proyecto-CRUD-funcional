import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    children: [
      { path: 'rutas', loadComponent: () => import('./admin/transit-lines/transit-lines.component').then(m => m.TransitLinesComponent) },
      { path: 'voyagePasses', loadComponent: () => import('./admin/voyagePasses/voyagePasses.component').then(m => m.VoyagePasssComponent) },
      { path: '', redirectTo: 'rutas', pathMatch: 'full' }
    ]
  },
  {
    path: 'cajero',
    loadComponent: () => import('./agent/agent.component').then(m => m.AgentComponent)
  },
  {
    path: 'cajero/voyage-pass/:id',
    loadComponent: () => import('./agent/voyage-pass-receipt/voyage-pass-receipt.component').then(m => m.VoyagePassReceiptComponent)
  }
];
