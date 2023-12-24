export interface PostulanteRequest {
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
   fk_postulante_estado: string;
   fk_operador: string;
   fk_usuario: string;
   lst_postulante_carrera: PostulanteCarreraRequest[];
   cls_postulante_historial: PostulanteHistorialRequest;
}
export interface PostulanteCarreraRequest {
   numero_opcion: number;
   activo: boolean;
   fk_postulante: string;
   fk_carrera: string;
}

export interface PostulanteHistorialRequest {
   fecha_registro: string;
   fk_postulante: string;
   fk_usuario: string;
}

export interface PostulanteActualizarRequest {
   dni: string;
   nombre: string;
   apellido_paterno: string;
   apellido_materno: string;
   direccion: string;
   telefono: string;
   observacion: string;
   fecha_actualizacion: string;
   fk_postulante_estado: string;
   fk_operador: string;
   fk_usuario: string;
   lst_postulante_carrera: PostulanteCarreraRequest[];
   cls_postulante_historial: PostulanteHistorialRequest;
}

export interface PostulanteCarreraActualizarRequest {
   numero_opcion: number;
   activo: boolean;
   fk_postulante: string;
   fk_carrera: string;
}

export interface PostulanteHistorialRequest {
   fecha_registro: string;
   fk_postulante: string;
   fk_usuario: string;
}
