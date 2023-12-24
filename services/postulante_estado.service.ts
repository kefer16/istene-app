import { PostulanteEstadoApi } from "../apis/postulante_estado.api";
import { Option } from "../components/SelectCustom";
import { PostulanteEstadoResponse } from "../interfaces/responses/postulante_estado.response";

export class PostulanteEstadoService {
   private apiPostulanteEstado = new PostulanteEstadoApi();

   private rspListarGrupal: PostulanteEstadoResponse[] = [];
   private rspListarGrupalActivos: PostulanteEstadoResponse[] = [];
   private rspLlenarCombo: Option[] = [];
   //individual

   //grupal
   async listarGrupal(): Promise<PostulanteEstadoResponse[]> {
      await this.apiPostulanteEstado.listarGrupal().then((resp) => {
         this.rspListarGrupal = resp.data.data;
      });
      return this.rspListarGrupal;
   }

   async listarGrupalActivos(): Promise<PostulanteEstadoResponse[]> {
      await this.apiPostulanteEstado.listarGrupalActivos().then((resp) => {
         this.rspListarGrupalActivos = resp.data.data;
      });
      return this.rspListarGrupalActivos;
   }

   async llenarCombo(): Promise<Option[]> {
      await this.apiPostulanteEstado.listarGrupalActivos().then((resp) => {
         this.rspLlenarCombo.push({
            value: "0",
            label: "-SELECCIONE-",
         });
         resp.data.data.map((element: PostulanteEstadoResponse) => {
            this.rspLlenarCombo.push({
               value: element.postulante_estado_id,
               label: element.nombre,
            });
         });
      });
      return this.rspLlenarCombo;
   }

   async llenarComboFiltros(): Promise<Option[]> {
      await this.apiPostulanteEstado.listarGrupalActivos().then((resp) => {
         this.rspLlenarCombo.push({
            value: "-1",
            label: "TODOS",
         });
         resp.data.data.map((element: PostulanteEstadoResponse) => {
            this.rspLlenarCombo.push({
               value: element.postulante_estado_id,
               label: element.nombre,
            });
         });
      });
      return this.rspLlenarCombo;
   }
}
