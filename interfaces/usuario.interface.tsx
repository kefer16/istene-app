export type privilegio = "ADM" | "USU" | "INV";

export interface LogeoUsuario {
   usuario_id: string;
   nombre: string;
   apellido: string;
   correo: string;
   usuario: string;
   direccion: string;
   telefono: string;
   foto: string;
   cls_privilegio: PrivilegioLogin;
}

export interface PrivilegioLogin {
   privilegio_id: string;
   abreviatura: privilegio;
   tipo: string;
}

export interface ActualizarIndividualContraseniaRequest {
   contrasenia_actual: string;
   contrasenia_nueva: string;
}
