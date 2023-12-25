export interface UsuarioListarIndividualResponse {
   usuario_id: string;
   dni: string;
   nombre: string;
   apellido_paterno: string;
   apellido_materno: string;
   correo: string;
   usuario: string;
   fecha_registro: string;
   direccion: string;
   telefono: string;
}

export interface UsuarioListarGrupalActivosResponse {
   usuario_id: string;
   usuario: string;
}
