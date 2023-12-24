import { API_URL, BEARER_TOKEN } from "@env";
const ENV_API_URL: string = API_URL ?? "";
const ENV_BEARER_TOKEN: string = BEARER_TOKEN ?? "";

export class PostulanteEstadoEntity {
   constructor(
      public postulante_estado_id: string,
      public abreviatura: string,
      public nombre: string,
      public activo: boolean,
      public fecha_registro: string
   ) {}
   public static bearer = ENV_BEARER_TOKEN;
   public static url = `${ENV_API_URL}/postulante_estado`;
}
