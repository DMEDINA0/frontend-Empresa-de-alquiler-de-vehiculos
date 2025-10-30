export interface Factura {
  id_factura: string;
  fecha_emision: string;
  monto_total: number;
  id_alquiler: string;
  id_usuario_creacion: string;
  fecha_creacion: string;
  fecha_actualizacion?: string;
}

export interface CreateFacturaRequest {
  id_alquiler: string;
  id_usuario_creacion: string;
}

export interface UpdateFacturaRequest {
  monto_total?: number;
}

export interface FacturaFilters {
  id_alquiler?: string;
  fecha_desde?: string;
  fecha_hasta?: string;
}