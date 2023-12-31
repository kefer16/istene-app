import { API_URL, BEARER_TOKEN } from "@env";
const ENV_API_URL: string = API_URL ?? "";
const ENV_BEARER_TOKEN: string = BEARER_TOKEN ?? "";

export class PostulanteEntity {
   constructor(
      public postulante_id: string,
      public dni: string,
      public nombre: string,
      public apellido_paterno: string,
      public apellido_materno: string,
      public direccion: string,
      public telefono: string,
      public observacion: string,
      public activo: boolean,
      public fecha_registro: string,
      public fk_operador: string,
      public fk_usuario: string
   ) {}
   public static bearer = ENV_BEARER_TOKEN;
   public static url = `${ENV_API_URL}/postulante`;
}
