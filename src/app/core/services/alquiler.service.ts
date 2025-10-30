import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Alquiler,
  AlquilerFilters,
  CreateAlquilerRequest,
  UpdateAlquilerRequest
} from '../../shared/models/alquiler.model';
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams
} from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  private readonly endpoint = '/alquileres';

  constructor(private apiService: ApiService) {}

  /**
   * Obtiene todos los alquileres con paginación y filtros
   */
  getAlquileres(
    pagination: PaginationParams,
    filters?: AlquilerFilters
  ): Observable<PaginatedResponse<Alquiler>> {
    return this.apiService.getPaginated<Alquiler>(this.endpoint, pagination, filters);
  }

  /**
   * Obtiene un alquiler por su ID
   */
  getAlquilerById(id: string): Observable<ApiResponse<Alquiler>> {
    return this.apiService.get<Alquiler>(`${this.endpoint}/${id}`);
  }

  /**
   * Crea un nuevo alquiler
   */
  createAlquiler(data: CreateAlquilerRequest): Observable<ApiResponse<Alquiler>> {
    return this.apiService.post<Alquiler>(this.endpoint, data);
  }

  /**
   * Actualiza un alquiler existente
   */
  updateAlquiler(id: string, data: UpdateAlquilerRequest): Observable<ApiResponse<Alquiler>> {
    return this.apiService.put<Alquiler>(`${this.endpoint}/${id}`, data);
  }

  /**
   * Elimina un alquiler
   */
  deleteAlquiler(id: string): Observable<ApiResponse<void>> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  /**
   * Marca un alquiler como devuelto
   */
  devolverVehiculo(id: string): Observable<ApiResponse<Alquiler>> {
    return this.apiService.post<Alquiler>(`${this.endpoint}/${id}/devolver`, {});
  }

  /**
   * Obtiene el alquiler activo de un cliente (sin fecha de fin)
   */
  getAlquilerActivo(clienteId: string): Observable<ApiResponse<Alquiler>> {
    return this.apiService.get<Alquiler>(`${this.endpoint}/activo/${clienteId}`);
  }
}