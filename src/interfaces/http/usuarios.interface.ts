export interface UsuarioResponse {
  id: number;
  tipoUsuario: TipoUsuario;
  usuario: string;
  nombres: string;
  apellidos: string;
  estaActivo: string;
}

export interface TipoUsuario {
  id: number;
  nombre: string;
}
