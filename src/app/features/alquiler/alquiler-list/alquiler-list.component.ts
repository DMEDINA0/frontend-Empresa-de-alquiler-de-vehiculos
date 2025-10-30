import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../core/models/api-response.model';
import { AlquilerService } from '../../../core/services/alquiler.service';
import { Alquiler, AlquilerFilters } from '../../../shared/models/alquiler.model';

@Component({
  selector: 'app-alquiler-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alquiler-list.component.html',
  styleUrl: './alquiler-list.component.scss'
})
export class AlquilerListComponent implements OnInit {
  alquileres: Alquiler[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;

  filters: AlquilerFilters = {};

  // Modal properties
  showModal = false;
  editingAlquiler: Alquiler | null = null;
  alquilerForm = {
    id_cliente: '',
    id_vehiculo: '',
    horas: 1,
    id_usuario_creacion: ''
  };

  constructor(private alquilerService: AlquilerService) {}

  ngOnInit(): void {
    this.loadAlquileres();
  }

  loadAlquileres(): void {
    this.loading = true;
    const pagination: PaginationParams = {
      page: this.currentPage,
      limit: this.pageSize
    };

    this.alquilerService.getAlquileres(pagination, this.filters).subscribe({
      next: (response) => {
        this.alquileres = response.data;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar alquileres:', error);
        this.loading = false;
      }
    });
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadAlquileres();
  }

  clearFilters(): void {
    this.filters = {};
    this.currentPage = 1;
    this.loadAlquileres();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAlquileres();
    }
  }

  openCreateModal(): void {
    this.editingAlquiler = null;
    this.alquilerForm = {
      id_cliente: '',
      id_vehiculo: '',
      horas: 1,
      id_usuario_creacion: ''
    };
    this.showModal = true;
  }

  editAlquiler(alquiler: Alquiler): void {
    this.editingAlquiler = alquiler;
    this.alquilerForm = {
      id_cliente: alquiler.id_cliente,
      id_vehiculo: alquiler.id_vehiculo,
      horas: alquiler.horas,
      id_usuario_creacion: alquiler.id_usuario_creacion
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingAlquiler = null;
    this.alquilerForm = {
      id_cliente: '',
      id_vehiculo: '',
      horas: 1,
      id_usuario_creacion: ''
    };
  }

  saveAlquiler(): void {
    const { id_cliente, id_vehiculo, horas, id_usuario_creacion } = this.alquilerForm;

    if (!id_cliente.trim() || !id_vehiculo.trim() || !id_usuario_creacion.trim()) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.editingAlquiler) {
      const updateData = { horas };
      this.alquilerService.updateAlquiler(this.editingAlquiler.id_alquiler, updateData).subscribe({
        next: () => {
          this.loadAlquileres();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar alquiler:', error);
          alert('Error al actualizar el alquiler');
        }
      });
    } else {
      const newAlquiler = { id_cliente, id_vehiculo, horas, id_usuario_creacion };
      this.alquilerService.createAlquiler(newAlquiler).subscribe({
        next: () => {
          this.loadAlquileres();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al crear alquiler:', error);
          alert('Error al crear el alquiler');
        }
      });
    }
  }

  deleteAlquiler(alquiler: Alquiler): void {
    if (confirm(`¿Está seguro de eliminar el alquiler iniciado el ${alquiler.fecha_inicio}?`)) {
      this.alquilerService.deleteAlquiler(alquiler.id_alquiler).subscribe({
        next: () => {
          this.loadAlquileres();
        },
        error: (error) => {
          console.error('Error al eliminar alquiler:', error);
        }
      });
    }
  }

  devolverVehiculo(alquiler: Alquiler): void {
    if (confirm(`¿Confirmar devolución del vehículo para el alquiler iniciado el ${alquiler.fecha_inicio}?`)) {
      this.alquilerService.devolverVehiculo(alquiler.id_alquiler).subscribe({
        next: () => {
          this.loadAlquileres();
        },
        error: (error) => {
          console.error('Error al devolver vehículo:', error);
          alert('Error al devolver el vehículo');
        }
      });
    }
  }
}