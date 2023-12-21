import { API_URL } from "@env";
const ENV_API_URL: string = API_URL ?? "";

export class CandidatoEstadoEntity {
   constructor(
      public candidato_estado_id: string,
      public abreviatura: string,
      public nombre: string,
      public activo: boolean,
      public fecha_registro: string
   ) {}
   public static url = `${ENV_API_URL}/candidato_estado`;
}
