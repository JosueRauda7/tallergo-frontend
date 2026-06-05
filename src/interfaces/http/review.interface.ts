export interface ReviewResponse {
  id: number;
  usuario: Usuario;
  taller: Taller;
  estrellas: number;
  comentarios: string;
  estaActivo: string;
  estaEliminado: string;
}

export interface Taller {
  id: number;
  nombre: string;
  latitud: string;
  longitud: string;
  direccion: string;
  telefono: string;
  whatsapp: null;
  email: string;
  estaActivo: string;
  estaEliminado: string;
}

export interface Usuario {
  id: number;
  usuario: string;
  nombres: string;
  apellidos: string;
  pwd: Pwd;
  estaActivo: string;
  estaEliminado: string;
}

export interface Pwd {
  type: string;
  data: number[];
}
