/**
 * Modelo para la entidad Cliente
 */
export interface Cliente {
  id_cliente: string;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  fecha_nacimiento: string;
  id_usuario_creacion?: string;
  fecha_creacion: string;
  fecha_actualizacion?: string;
}

/**
 * Modelo para crear un nuevo cliente
 */
export interface CreateClienteRequest {
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  fecha_nacimiento: string;
  id_usuario_creacion?: string;
}

/**
 * Modelo para actualizar un cliente
 */
export interface UpdateClienteRequest {
  primer_nombre?: string;
  segundo_nombre?: string;
  primer_apellido?: string;
  segundo_apellido?: string;
  fecha_nacimiento?: string;
}

/**
 * Modelo para filtros de clientes
 */
export interface ClienteFilters {
  primer_nombre?: string;
  primer_apellido?: string;
  fecha_desde?: string;
  fecha_hasta?: string;
}
