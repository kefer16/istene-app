import { OperadorApi } from "../apis/operador.api";
import { OperadorReponse } from "../interfaces/responses/operador.response";

export class OperadorService {
   private apiOperador = new OperadorApi();

   private rspListarGrupal: OperadorReponse[] = [];
   private rspListarGrupalActivos: OperadorReponse[] = [];

   //individual

   //grupal
   async listarGrupal(): Promise<OperadorReponse[]> {
      await this.apiOperador.listarGrupal().then((resp) => {
         this.rspListarGrupal = resp.data.data;
      });
      return this.rspListarGrupal;
   }

   async listarGrupalActivos(): Promise<OperadorReponse[]> {
      await this.apiOperador.listarGrupalActivos().then((resp) => {
         this.rspListarGrupalActivos = resp.data.data;
      });
      return this.rspListarGrupalActivos;
   }
}
