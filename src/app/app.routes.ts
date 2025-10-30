import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'categorias',
    loadComponent: () => import('./features/categoria/categoria-list/categoria-list.component').then(m => m.CategoriaListComponent)
  },
  {
  path: 'clientes',
  loadComponent: () =>
    import('./features/cliente/cliente-list/cliente-list.component').then(m => m.ClienteListComponent)
  },
  {
  path: 'vehiculos',
  loadComponent: () => import('./features/vehiculo/vehiculo-list/vehiculo-list.component').then(m => m.VehiculoListComponent)
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./features/usuario/usuario-list/usuario-list.component').then(m => m.UsuarioListComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
  path: 'alquileres',
  loadComponent: () => import('./features/alquiler/alquiler-list/alquiler-list.component').then(m => m.AlquilerListComponent)
  },
  {
  path: 'facturas',
  loadComponent: () =>
    import('./features/factura/factura-list/factura-list.component').then(m => m.FacturaListComponent)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
