import { OperadorApi } from "../apis/operador.api";
import { Option } from "../components/SelectCustom";
import { OperadorReponse } from "../interfaces/responses/operador.response";

export class OperadorService {
   private apiOperador = new OperadorApi();

   private rspListarGrupal: OperadorReponse[] = [];
   private rspListarGrupalActivos: OperadorReponse[] = [];
   private rspLlenarCombo: Option[] = [];
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

   async llenarCombo(): Promise<Option[]> {
      await this.apiOperador.listarGrupalActivos().then((resp) => {
         this.rspLlenarCombo.push({
            value: "0",
            label: "Selec. Opción",
         });
         resp.data.data.map((element: OperadorReponse) => {
            this.rspLlenarCombo.push({
               value: element.operador_id,
               label: element.nombre,
            });
         });
      });
      return this.rspLlenarCombo;
   }
}
