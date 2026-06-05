export interface LoginResponse {
  id: number;
  tipoUsuario: TipoUsuario;
  usuario: string;
  nombres: string;
  apellidos: string;
  token: string;
}

export interface TipoUsuario {
  id: number;
  nombre: string;
  estaActivo: string;
  estaEliminado: string;
}
