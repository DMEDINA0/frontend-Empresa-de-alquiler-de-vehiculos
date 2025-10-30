import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Usuario,
  UsuarioFilters,
  CreateUsuarioRequest,
  UpdateUsuarioRequest,
  ChangePasswordRequest
} from '../../shared/models/usuario.model';
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams
} from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly endpoint = '/usuarios';

  constructor(private apiService: ApiService) {}

  /**
   * Obtiene todos los usuarios con paginación y filtros
   */
  getUsuarios(pagination: PaginationParams, filters?: UsuarioFilters): Observable<PaginatedResponse<Usuario>> {
    return this.apiService.getPaginated<Usuario>(this.endpoint, pagination, filters);
  }

  /**
   * Obtiene un usuario por ID
   */
  getUsuarioById(id: string): Observable<ApiResponse<Usuario>> {
    return this.apiService.get<Usuario>(`${this.endpoint}/${id}`);
  }

  /**
   * Crea un nuevo usuario
   */
  createUsuario(data: CreateUsuarioRequest): Observable<ApiResponse<Usuario>> {
    return this.apiService.post<Usuario>(this.endpoint, data);
  }

  /**
   * Actualiza un usuario existente
   */
  updateUsuario(id: string, data: UpdateUsuarioRequest): Observable<ApiResponse<Usuario>> {
    return this.apiService.put<Usuario>(`${this.endpoint}/${id}`, data);
  }

  /**
   * Elimina un usuario
   */
  deleteUsuario(id: string): Observable<ApiResponse<void>> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  /**
   * Cambia la contraseña de un usuario
   */
  changePassword(id: string, passwordData: ChangePasswordRequest): Observable<ApiResponse<void>> {
    return this.apiService.post<void>(`${this.endpoint}/${id}/change-password`, passwordData);
  }

  /**
   * Obtiene todos los usuarios activos (sin paginación)
   */
  getUsuariosActivos(): Observable<ApiResponse<Usuario[]>> {
    return this.apiService.get<Usuario[]>(`${this.endpoint}/activos`);
  }

  /**
   * Activa o desactiva un usuario
   */
  toggleUsuarioStatus(id: string, activo: boolean): Observable<ApiResponse<Usuario>> {
    return this.apiService.patch<Usuario>(`${this.endpoint}/${id}/toggle-status`, { activo });
  }

  /**
   * Autentica un usuario por email y contraseña
   */
  login(email: string, contraseña: string): Observable<ApiResponse<Usuario>> {
    return this.apiService.post<Usuario>(`${this.endpoint}/login`, { email, contraseña });
  }
}