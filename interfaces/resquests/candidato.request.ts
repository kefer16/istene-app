export interface CandidatoRequest {
   dni: string;
   nombre: string;
   apellido_paterno: string;
   apellido_materno: string;
   direccion: string;
   telefono: string;
   observacion: string;
   activo: boolean;
   fecha_registro: string;
   fecha_actualizacion: string;
   fk_candidato_estado: string;
   fk_operador: string;
   fk_usuario: string;
   lst_candidato_carrera: CandidatoCarreraRequest[];
   cls_candidato_historial: CandidatoHistorialRequest;
}
export interface CandidatoCarreraRequest {
   numero_opcion: number;
   activo: boolean;
   fk_candidato: string;
   fk_carrera: string;
}

export interface CandidatoHistorialRequest {
   fecha_registro: string;
   fk_candidato: string;
   fk_usuario: string;
}

export interface CandidatoActualizarRequest {
   dni: string;
   nombre: string;
   apellido_paterno: string;
   apellido_materno: string;
   direccion: string;
   telefono: string;
   observacion: string;
   fecha_actualizacion: string;
   fk_candidato_estado: string;
   fk_operador: string;
   fk_usuario: string;
   lst_candidato_carrera: CandidatoCarreraRequest[];
   cls_candidato_historial: CandidatoHistorialRequest;
}

export interface CandidatoCarreraActualizarRequest {
   numero_opcion: number;
   activo: boolean;
   fk_candidato: string;
   fk_carrera: string;
}

export interface CandidatoHistorialRequest {
   fecha_registro: string;
   fk_candidato: string;
   fk_usuario: string;
}
