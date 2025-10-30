import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Factura,
  FacturaFilters,
  CreateFacturaRequest,
  UpdateFacturaRequest
} from '../../shared/models/factura.model';
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams
} from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private readonly endpoint = '/facturas';

  constructor(private apiService: ApiService) {}

  /**
   * Obtiene todas las facturas con paginación y filtros
   */
  getFacturas(
    pagination: PaginationParams,
    filters?: FacturaFilters
  ): Observable<PaginatedResponse<Factura>> {
    return this.apiService.getPaginated<Factura>(this.endpoint, pagination, filters);
  }

  /**
   * Obtiene una factura por su ID
   */
  getFacturaById(id: string): Observable<ApiResponse<Factura>> {
    return this.apiService.get<Factura>(`${this.endpoint}/${id}`);
  }

  /**
   * Genera una nueva factura a partir de un alquiler
   */
  generarFactura(data: CreateFacturaRequest): Observable<ApiResponse<Factura>> {
    return this.apiService.post<Factura>(`${this.endpoint}/generar`, data);
  }

  /**
   * Actualiza una factura existente
   */
  updateFactura(id: string, data: UpdateFacturaRequest): Observable<ApiResponse<Factura>> {
    return this.apiService.put<Factura>(`${this.endpoint}/${id}`, data);
  }

  /**
   * Elimina una factura
   */
  deleteFactura(id: string): Observable<ApiResponse<void>> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}