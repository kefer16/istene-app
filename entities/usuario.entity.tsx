import { API_URL, BEARER_TOKEN } from "@env";
const ENV_API_URL: string = API_URL ?? "";
const ENV_BEARER_TOKEN: string = BEARER_TOKEN ?? "";
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
   public static bearer = ENV_BEARER_TOKEN;
   public static url = `${ENV_API_URL}/usuario`;
}
