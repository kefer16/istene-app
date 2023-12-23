import { API_URL, BEARER_TOKEN } from "@env";
const ENV_API_URL: string = API_URL ?? "";
const ENV_BEARER_TOKEN: string = BEARER_TOKEN ?? "";
export class CarreraEntity {
   constructor(
      public carrera_id: string,
      public nombre: string,
      public activo: boolean,
      public fecha_registro: string,
      public fk_usuario: string
   ) {}
   public static bearer = ENV_BEARER_TOKEN;
   public static url = `${ENV_API_URL}/carrera`;
}
