import { API_URL } from "@env";
const ENV_API_URL: string = API_URL ?? "";

export class OperadorEntity {
   constructor(
      public operador_id: string,
      public nombre: string,
      public activo: boolean,
      public fecha_registro: string
   ) {}
   public static url = `${ENV_API_URL}/operador`;
}
