export interface SearchResponse {
  id: number;
  empresa: Empresa;
  tipoTaller: TipoTaller;
  nombre: string;
  latitud: string;
  longitud: string;
  direccion: string;
  telefono: string;
  whatsapp: null;
  email: string;
  estaActivo: string;
  estaEliminado: string;
  distancia: number;
}

export interface Empresa {
  id: number;
  nombre: string;
  latitud: string;
  longitud: string;
  direccionPrincipal: string;
  telefonoPrincipal: string;
  correoPrincipal: string;
  estaActivo: string;
  estaEliminado: string;
}

export interface TipoTaller {
  id: number;
  nombre: string;
  estaActivo: string;
  estaEliminado: string;
}
