export interface Alquiler {
  id_alquiler: string;
  fecha_inicio: string;
  horas: number;
  id_cliente: string;
  id_vehiculo: string;
  id_usuario_creacion: string;
  fecha_creacion: string;
  fecha_actualizacion?: string;
  fecha_fin?: string;
}

export interface CreateAlquilerRequest {
  id_cliente: string;
  id_vehiculo: string;
  horas: number;
  id_usuario_creacion: string;
}

export interface UpdateAlquilerRequest {
  horas?: number;
  fecha_fin?: string;
}

export interface AlquilerFilters {
  id_cliente?: string;
  id_vehiculo?: string;
  fecha_inicio_desde?: string;
  fecha_inicio_hasta?: string;
  activo?: boolean;
}