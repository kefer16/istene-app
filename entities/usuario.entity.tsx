import { API_URL } from "@env";
const ENV_API_URL: string = API_URL ?? "";

export class UsuarioEntity {
   constructor(
      public usuario_id: string = "",
      public dni: string = "",
      public nombre: string = "",
      public apellido_paterno: string = "",
      public apellido_materno: string = "",
      public correo: string = "",
      public usuario: string = "",
      public contrasenia: string = "",
      public foto: string = "",
      public fecha_registro: string = "",
      public direccion: string = "",
      public telefono: string = "",
      public activo: boolean = false,
      public fk_privilegio: string = ""
   ) {}
   public static url = `${ENV_API_URL}/usuario`;
}
