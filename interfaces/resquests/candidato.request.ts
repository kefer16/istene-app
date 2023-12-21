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
   fk_candidato_estado: string;
   fk_operador: string;
   fk_usuario: string;
   lst_candidato_carrera: CandidatoCarreraRequest[];
}
export interface CandidatoCarreraRequest {
   numero_opcion: number;
   activo: boolean;
   fk_candidato: string;
   fk_carrera: string;
}
