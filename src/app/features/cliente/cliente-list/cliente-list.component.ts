import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../core/models/api-response.model';
import { ClienteService } from '../../../core/services/cliente.service';
import { Cliente, ClienteFilters } from '../../../shared/models/cliente.model';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;

  filters: ClienteFilters = {};

  // Modal properties
  showModal = false;
  editingCliente: Cliente | null = null;
  clienteForm = {
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    fecha_nacimiento: '',
    id_usuario_creacion: ''
  };

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.loading = true;
    const pagination: PaginationParams = {
      page: this.currentPage,
      limit: this.pageSize
    };

    this.clienteService.getClientes(pagination, this.filters).subscribe({
    next: (response) => {
      this.clientes = response.data; // ✅ Usa .data
      this.totalPages = Math.ceil(response.total / this.pageSize);
      this.loading = false;
    },

      error: (error) => {
        console.error('Error al cargar clientes:', error);
        this.loading = false;
      }
    });
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadClientes();
  }

  clearFilters(): void {
    this.filters = {};
    this.currentPage = 1;
    this.loadClientes();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadClientes();
    }
  }

  openCreateModal(): void {
    this.editingCliente = null;
    this.clienteForm = {
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      fecha_nacimiento: '',
      id_usuario_creacion: ''
    };
    this.showModal = true;
  }

  editCliente(cliente: Cliente): void {
    this.editingCliente = cliente;
    this.clienteForm = {
      primer_nombre: cliente.primer_nombre,
      segundo_nombre: cliente.segundo_nombre || '',
      primer_apellido: cliente.primer_apellido,
      segundo_apellido: cliente.segundo_apellido || '',
      fecha_nacimiento: cliente.fecha_nacimiento,
      id_usuario_creacion: cliente.id_usuario_creacion || ''
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingCliente = null;
    this.clienteForm = {
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      fecha_nacimiento: '',
      id_usuario_creacion: ''
    };
  }

  saveCliente(): void {
    const {
      primer_nombre,
      primer_apellido,
      fecha_nacimiento,
      id_usuario_creacion
    } = this.clienteForm;

    if (!primer_nombre.trim() || !primer_apellido.trim() || !fecha_nacimiento.trim()) {
      alert('Los campos obligatorios no pueden estar vacíos');
      return;
    }

    if (this.editingCliente) {
      const updateData = { ...this.clienteForm };
      this.clienteService.updateCliente(this.editingCliente.id_cliente, updateData).subscribe({
        next: () => {
          this.loadClientes();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar cliente:', error);
          alert('Error al actualizar el cliente');
        }
      });
    } else {
      this.clienteService.createCliente(this.clienteForm).subscribe({
        next: () => {
          this.loadClientes();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al crear cliente:', error);
          alert('Error al crear el cliente');
        }
      });
    }
  }

  deleteCliente(cliente: Cliente): void {
    if (confirm(`¿Está seguro de eliminar a ${cliente.primer_nombre} ${cliente.primer_apellido}?`)) {
      this.clienteService.deleteCliente(cliente.id_cliente).subscribe({
        next: () => {
          this.loadClientes();
        },
        error: (error) => {
          console.error('Error al eliminar cliente:', error);
        }
      });
    }
  }
}