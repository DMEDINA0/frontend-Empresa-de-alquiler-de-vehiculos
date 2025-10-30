import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../core/models/api-response.model';
import { FacturaService } from '../../../core/services/factura.service';
import { Factura, FacturaFilters } from '../../../shared/models/factura.model';

@Component({
  selector: 'app-factura-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './factura-list.component.html',
  styleUrl: './factura-list.component.scss'
})
export class FacturaListComponent implements OnInit {
  facturas: Factura[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;

  filters: FacturaFilters = {};

  // Modal properties
  showModal = false;
  editingFactura: Factura | null = null;
  facturaForm = {
    id_alquiler: '',
    id_usuario_creacion: ''
  };

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.loadFacturas();
  }

  loadFacturas(): void {
    this.loading = true;
    const pagination: PaginationParams = {
      page: this.currentPage,
      limit: this.pageSize
    };

    this.facturaService.getFacturas(pagination, this.filters).subscribe({
      next: (response) => {
        this.facturas = response.data;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar facturas:', error);
        this.loading = false;
      }
    });
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadFacturas();
  }

  clearFilters(): void {
    this.filters = {};
    this.currentPage = 1;
    this.loadFacturas();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadFacturas();
    }
  }

  openCreateModal(): void {
    this.editingFactura = null;
    this.facturaForm = {
      id_alquiler: '',
      id_usuario_creacion: ''
    };
    this.showModal = true;
  }

  editFactura(factura: Factura): void {
    this.editingFactura = factura;
    this.facturaForm = {
      id_alquiler: factura.id_alquiler,
      id_usuario_creacion: factura.id_usuario_creacion
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingFactura = null;
    this.facturaForm = {
      id_alquiler: '',
      id_usuario_creacion: ''
    };
  }

  saveFactura(): void {
    const { id_alquiler, id_usuario_creacion } = this.facturaForm;

    if (!id_alquiler.trim() || !id_usuario_creacion.trim()) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.editingFactura) {
      const updateData = { monto_total: this.editingFactura.monto_total };
      this.facturaService.updateFactura(this.editingFactura.id_factura, updateData).subscribe({
        next: () => {
          this.loadFacturas();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar factura:', error);
          alert('Error al actualizar la factura');
        }
      });
    } else {
      const newFactura = { id_alquiler, id_usuario_creacion };
      this.facturaService.generarFactura(newFactura).subscribe({
        next: () => {
          this.loadFacturas();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al generar factura:', error);
          alert('Error al generar la factura');
        }
      });
    }
  }

  deleteFactura(factura: Factura): void {
    if (confirm(`¿Está seguro de eliminar la factura emitida el ${factura.fecha_emision}?`)) {
      this.facturaService.deleteFactura(factura.id_factura).subscribe({
        next: () => {
          this.loadFacturas();
        },
        error: (error) => {
          console.error('Error al eliminar factura:', error);
        }
      });
    }
  }
}