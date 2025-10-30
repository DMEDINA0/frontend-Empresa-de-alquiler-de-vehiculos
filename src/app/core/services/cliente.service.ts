import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Cliente,
  ClienteFilters,
  CreateClienteRequest,
  UpdateClienteRequest
} from '../../shared/models/cliente.model';
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams
} from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly endpoint = '/clientes';

  constructor(private apiService: ApiService) {}

  /**
   * Obtiene todos los clientes con paginación y filtros
   */
  getClientes(
    pagination: PaginationParams,
    filters?: ClienteFilters
  ): Observable<PaginatedResponse<Cliente>> {
    return this.apiService.getPaginated<Cliente>(this.endpoint, pagination, filters);
  }

  /**
   * Obtiene un cliente por su ID
   */
  getClienteById(id: string): Observable<ApiResponse<Cliente>> {
    return this.apiService.get<Cliente>(`${this.endpoint}/${id}`);
  }

  /**
   * Crea un nuevo cliente
   */
  createCliente(data: CreateClienteRequest): Observable<ApiResponse<Cliente>> {
    return this.apiService.post<Cliente>(this.endpoint, data);
  }

  /**
   * Actualiza un cliente existente
   */
  updateCliente(id: string, data: UpdateClienteRequest): Observable<ApiResponse<Cliente>> {
    return this.apiService.put<Cliente>(`${this.endpoint}/${id}`, data);
  }

  /**
   * Elimina un cliente
   */
  deleteCliente(id: string): Observable<ApiResponse<void>> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}