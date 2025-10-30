import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Vehiculo,
  CreateVehiculoRequest,
  UpdateVehiculoRequest,
  VehiculoFilters
} from '../../shared/models/vehiculo.model';
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams
} from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private readonly endpoint = '/vehiculos';

  constructor(private apiService: ApiService) {}

  /**
   * Obtiene todos los vehículos con paginación
   */
  getVehiculos(pagination: PaginationParams, filters?: VehiculoFilters): Observable<PaginatedResponse<Vehiculo>> {
    return this.apiService.getPaginated<Vehiculo>(this.endpoint, pagination, filters);
  }

  /**
   * Obtiene un vehículo por ID
   */
  getVehiculoById(id: string): Observable<ApiResponse<Vehiculo>> {
    return this.apiService.get<Vehiculo>(`${this.endpoint}/${id}`);
  }

  /**
   * Crea un nuevo vehículo
   */
  createVehiculo(data: CreateVehiculoRequest): Observable<ApiResponse<Vehiculo>> {
    return this.apiService.post<Vehiculo>(this.endpoint, data);
  }

  /**
   * Actualiza un vehículo existente
   */
  updateVehiculo(id: string, data: UpdateVehiculoRequest): Observable<ApiResponse<Vehiculo>> {
    return this.apiService.put<Vehiculo>(`${this.endpoint}/${id}`, data);
  }

  /**
   * Elimina un vehículo
   */
  deleteVehiculo(id: string): Observable<ApiResponse<void>> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  /**
   * Obtiene todos los vehículos disponibles (sin paginación)
   */
  getVehiculosDisponibles(): Observable<ApiResponse<Vehiculo[]>> {
    return this.apiService.get<Vehiculo[]>(`${this.endpoint}/disponibles`);
  }

  /**
   * Cambia la disponibilidad de un vehículo
   */
  cambiarDisponibilidad(id: string, disponible: boolean): Observable<ApiResponse<Vehiculo>> {
    return this.apiService.put<Vehiculo>(`${this.endpoint}/${id}/disponibilidad`, { disponible });
  }
}