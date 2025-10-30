/**
 * Modelo para la entidad Vehiculo
 */
export interface Vehiculo {
  id_vehiculo: string;
  nombre: string;
  tarifa_hora: number;
  disponible: boolean;
  id_categoria: string;
  categoria?: {
    id_categoria: string;
    nombre_categoria: string;
    descripcion?: string;
    id_usuario_creacion?: string;
    id_usuario_edicion?: string;
    fecha_creacion?: string;
    fecha_actualizacion?: string;
  };
  id_usuario_creacion: string;
  fecha_creacion: string;
  fecha_actualizacion?: string;
}

/**
 * Modelo para crear un nuevo vehículo
 */
export interface CreateVehiculoRequest {
  nombre: string;
  tarifa_hora: number;
  id_categoria: string;
  id_usuario_creacion: string;
  disponible?: boolean;
}

/**
 * Modelo para actualizar un vehículo
 */
export interface UpdateVehiculoRequest {
  nombre?: string;
  tarifa_hora?: number;
  id_categoria?: string;
  disponible?: boolean;
}

/**
 * Modelo para filtros de vehículos
 */
export interface VehiculoFilters {
  nombre?: string;
  id_categoria?: string;
  disponible?: boolean;
  tarifa_min?: number;
  tarifa_max?: number;
  fecha_desde?: string;
  fecha_hasta?: string;
}

