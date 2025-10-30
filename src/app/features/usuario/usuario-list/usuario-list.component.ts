import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../core/models/api-response.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Usuario, UsuarioFilters } from '../../../shared/models/usuario.model';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.scss'
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;

  filters: UsuarioFilters = {};

  showModal = false;
  editingUsuario: Usuario | null = null;
  usuarioForm = {
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    rol_usuario: 'usuario',
    email: '',
    password: '',
    activo: true
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    const pagination: PaginationParams = {
      page: this.currentPage,
      limit: this.pageSize
    };

    this.usuarioService.getUsuarios(pagination, this.filters).subscribe({
      next: (response) => {
        this.usuarios = response.data;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.loading = false;
      }
    });
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadUsuarios();
  }

  clearFilters(): void {
    this.filters = {};
    this.currentPage = 1;
    this.loadUsuarios();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsuarios();
    }
  }

  openCreateModal(): void {
    this.editingUsuario = null;
    this.usuarioForm = {
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      rol_usuario: 'usuario',
      email: '',
      password: '',
      activo: true
    };
    this.showModal = true;
  }

  editUsuario(usuario: Usuario): void {
    this.editingUsuario = usuario;
    this.usuarioForm = {
      primer_nombre: usuario.primer_nombre,
      segundo_nombre: usuario.segundo_nombre || '',
      primer_apellido: usuario.primer_apellido,
      segundo_apellido: usuario.segundo_apellido || '',
      rol_usuario: usuario.rol_usuario,
      email: usuario.email,
      password: '',
      activo: usuario.activo
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingUsuario = null;
    this.usuarioForm = {
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      rol_usuario: 'usuario',
      email: '',
      password: '',
      activo: true
    };
  }

  saveUsuario(): void {
    const { email, primer_nombre, primer_apellido, password } = this.usuarioForm;

    if (!email.trim() || !primer_nombre.trim() || !primer_apellido.trim()) {
      alert('Email, nombre y apellido son requeridos');
      return;
    }

    if (!this.editingUsuario && !password.trim()) {
      alert('La contraseña es requerida para nuevos usuarios');
      return;
    }

    if (this.editingUsuario) {
      const updateData: any = { ...this.usuarioForm };
      if (!password.trim()) delete updateData.password;

      this.usuarioService.updateUsuario(this.editingUsuario.id_usuario, updateData).subscribe({
        next: () => {
          this.loadUsuarios();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          alert('Error al actualizar el usuario');
        }
      });
    } else {
      this.usuarioService.createUsuario(this.usuarioForm).subscribe({
        next: () => {
          this.loadUsuarios();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          alert('Error al crear el usuario');
        }
      });
    }
  }

  deleteUsuario(usuario: Usuario): void {
    if (confirm(`¿Está seguro de eliminar el usuario "${usuario.email}"?`)) {
      this.usuarioService.deleteUsuario(usuario.id_usuario).subscribe({
        next: () => {
          this.loadUsuarios();
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      });
    }
  }
}