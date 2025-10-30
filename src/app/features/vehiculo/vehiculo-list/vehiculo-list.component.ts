import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../core/models/api-response.model';
import { VehiculoService } from '../../../core/services/vehiculo.service';
import { Vehiculo, VehiculoFilters } from '../../../shared/models/vehiculo.model';

@Component({
  selector: 'app-vehiculo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehiculo-list.component.html',
  styleUrl: './vehiculo-list.component.scss'
})
export class VehiculoListComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;

  filters: VehiculoFilters = {};

  // Modal properties
  showModal = false;
  editingVehiculo: Vehiculo | null = null;
  vehiculoForm = {
    nombre: '',
    tarifa_hora: 0,
    id_categoria: '',
    id_usuario_creacion: '',
    disponible: true
  };

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.loadVehiculos();
  }

  loadVehiculos(): void {
    this.loading = true;
    const pagination: PaginationParams = {
      page: this.currentPage,
      limit: this.pageSize
    };

    this.vehiculoService.getVehiculos(pagination, this.filters).subscribe({
      next: (response) => {
        this.vehiculos = response.data;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar vehículos:', error);
        this.loading = false;
      }
    });
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadVehiculos();
  }

  clearFilters(): void {
    this.filters = {};
    this.currentPage = 1;
    this.loadVehiculos();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadVehiculos();
    }
  }

  openCreateModal(): void {
    this.editingVehiculo = null;
    this.vehiculoForm = {
      nombre: '',
      tarifa_hora: 0,
      id_categoria: '',
      id_usuario_creacion: '',
      disponible: true
    };
    this.showModal = true;
  }

  editVehiculo(vehiculo: Vehiculo): void {
    this.editingVehiculo = vehiculo;
    this.vehiculoForm = {
      nombre: vehiculo.nombre,
      tarifa_hora: vehiculo.tarifa_hora,
      id_categoria: vehiculo.id_categoria,
      id_usuario_creacion: vehiculo.id_usuario_creacion,
      disponible: vehiculo.disponible
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingVehiculo = null;
    this.vehiculoForm = {
      nombre: '',
      tarifa_hora: 0,
      id_categoria: '',
      id_usuario_creacion: '',
      disponible: true
    };
  }

  saveVehiculo(): void {
    if (!this.vehiculoForm.nombre.trim() || this.vehiculoForm.tarifa_hora <= 0 || !this.vehiculoForm.id_categoria || !this.vehiculoForm.id_usuario_creacion) {
      alert('Nombre, tarifa, categoría y usuario son requeridos');
      return;
    }

    if (this.editingVehiculo) {
      const updateData = { ...this.vehiculoForm };
      this.vehiculoService.updateVehiculo(this.editingVehiculo.id_vehiculo, updateData).subscribe({
        next: () => {
          this.loadVehiculos();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar vehículo:', error);
          alert('Error al actualizar el vehículo');
        }
      });
    } else {
      const newVehiculo = { ...this.vehiculoForm };
      this.vehiculoService.createVehiculo(newVehiculo).subscribe({
        next: () => {
          this.loadVehiculos();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al crear vehículo:', error);
          alert('Error al crear el vehículo');
        }
      });
    }
  }

  deleteVehiculo(vehiculo: Vehiculo): void {
    if (confirm(`¿Está seguro de eliminar el vehículo "${vehiculo.nombre}"?`)) {
      this.vehiculoService.deleteVehiculo(vehiculo.id_vehiculo).subscribe({
        next: () => {
          this.loadVehiculos();
        },
        error: (error) => {
          console.error('Error al eliminar vehículo:', error);
        }
      });
    }
  }
}