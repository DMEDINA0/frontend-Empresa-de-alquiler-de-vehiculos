import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/categorias', title: 'Categorías',  icon:'category', class: '' },
    { path: '/clientes', title: 'Clientes', icon: 'group', class: '' },
    { path: '/usuarios', title: 'Usuarios',  icon:'person', class: '' },
    { path: '/vehiculos', title: 'Vehiculos',  icon:'directions_car', class: '' },
    { path: '/alquileres', title: 'Alquiler', icon: 'assignment', class: '' },
    { path: '/facturas', title: 'Facturas', icon: 'receipt_long', class: '' },
    { path: '/notifications', title: 'Notificaciones',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Configuración',  icon:'settings', class: 'active active-pro' }
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
