import { CandidatoEstadoApi } from "../apis/candidato_estado.api";
import { Option } from "../components/SelectCustom";
import { CandidatoEstadoResponse } from "../interfaces/responses/candidato_estado.response";

export class CandidatoEstadoService {
   private apiCandidatoEstado = new CandidatoEstadoApi();

   private rspListarGrupal: CandidatoEstadoResponse[] = [];
   private rspListarGrupalActivos: CandidatoEstadoResponse[] = [];
   private rspLlenarCombo: Option[] = [];
   //individual

   //grupal
   async listarGrupal(): Promise<CandidatoEstadoResponse[]> {
      await this.apiCandidatoEstado.listarGrupal().then((resp) => {
         this.rspListarGrupal = resp.data.data;
      });
      return this.rspListarGrupal;
   }

   async listarGrupalActivos(): Promise<CandidatoEstadoResponse[]> {
      await this.apiCandidatoEstado.listarGrupalActivos().then((resp) => {
         this.rspListarGrupalActivos = resp.data.data;
      });
      return this.rspListarGrupalActivos;
   }

   async llenarCombo(): Promise<Option[]> {
      await this.apiCandidatoEstado.listarGrupalActivos().then((resp) => {
         this.rspLlenarCombo.push({
            value: "0",
            label: "Selec. Opción",
         });
         resp.data.data.map((element: CandidatoEstadoResponse) => {
            this.rspLlenarCombo.push({
               value: element.candidato_estado_id,
               label: element.nombre,
            });
         });
      });
      return this.rspLlenarCombo;
   }
}
