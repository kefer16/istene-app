export interface CarreraRegistrarIndividualRequest {
   nombre: string;
   descripcion: string;
   activo: boolean;
   fecha_registro: string;
   fecha_actualizacion: string;
   fk_usuario: string;
   cls_carrera_historial: CarreraHistorialRegistrarIndividualRequest;
}

export interface CarreraHistorialRegistrarIndividualRequest {
   fecha_registro: string;
   fk_usuario: string;
   fk_carrera: string;
}

export interface CarreraActualizarIndividualRequest {
   nombre: string;
   descripcion: string;
   activo: boolean;
   fecha_actualizacion: string;
   fk_usuario: string;
   cls_carrera_historial: CarreraHistorialIndividualRequest;
}

export interface CarreraHistorialIndividualRequest {
   fecha_registro: string;
   fk_usuario: string;
   fk_carrera: string;
}
