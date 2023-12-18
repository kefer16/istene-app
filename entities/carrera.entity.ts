import { API_URL } from "@env";
const ENV_API_URL: string = API_URL ?? "";

export class CarreraEntity {
   constructor(
      public carrera_id: string,
      public nombre: string,
      public activo: boolean,
      public fecha_registro: string,
      public fk_usuario: string
   ) {}
   public static url = `${ENV_API_URL}/carrera`;
}
