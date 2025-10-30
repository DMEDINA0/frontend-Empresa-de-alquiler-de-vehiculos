/**
 * Modelo para la entidad Usuario
 */
export interface Usuario {
  id_usuario: string;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  rol_usuario: string;
  email: string;
  activo: boolean;
  es_admin: boolean;
  id_cliente?: string;
  id_usuario_creacion?: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  ultimo_acceso?: string;
}

/**
 * Modelo para crear un nuevo usuario
 */
export interface CreateUsuarioRequest {
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  rol_usuario: string;
  email: string;
  password: string; // ✅ corregido
  id_cliente?: string;
  id_usuario_creacion?: string;
  activo?: boolean;
}

/**
 * Modelo para actualizar un usuario
 */
export interface UpdateUsuarioRequest {
  primer_nombre?: string;
  segundo_nombre?: string;
  primer_apellido?: string;
  segundo_apellido?: string;
  rol_usuario?: string;
  email?: string;
  password?: string; // ✅ corregido
  id_cliente?: string;
  activo?: boolean;
}

/**
 * Modelo para cambiar contraseña
 */
export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

/**
 * Modelo para filtros de usuarios
 */
export interface UsuarioFilters {
  email?: string;
  rol_usuario?: string;
  primer_nombre?: string;
  primer_apellido?: string;
  activo?: boolean;
  fecha_desde?: string;
  fecha_hasta?: string;
}