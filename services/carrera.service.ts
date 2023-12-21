import { CarreraApi } from "../apis/carrera.api";
import { Option } from "../components/SelectCustom";
import { CarreraEntity } from "../entities/carrera.entity";
import { CarreraResponse } from "../interfaces/responses/carrera.response";

export class CarreraService {
   private apiCarrera = new CarreraApi();

   private rspRegistrarIndivial: CarreraResponse = {} as CarreraResponse;
   private rspActualizarIndividual: CarreraResponse = {} as CarreraResponse;
   private rspListarIndividual: CarreraResponse = {} as CarreraResponse;

   private rspListarGrupalNombre: CarreraResponse[] = [];
   private rspListarGrupalActivos: CarreraResponse[] = [];
   private rspLlenarCombo: Option[] = [];

   //individual
   async registrarIndividual(data: CarreraEntity): Promise<CarreraResponse> {
      await this.apiCarrera.registrarIndividual(data).then((resp) => {
         this.rspRegistrarIndivial = resp.data.data;
      });
      return this.rspRegistrarIndivial;
   }

   async actualizarIndividual(
      id: string,
      data: CarreraEntity
   ): Promise<CarreraResponse> {
      await this.apiCarrera.actualizarIndividual(id, data).then((resp) => {
         this.rspActualizarIndividual = resp.data.data;
      });
      return this.rspActualizarIndividual;
   }

   async listarIndividual(id: string): Promise<CarreraResponse> {
      await this.apiCarrera.listarIndividual(id).then((resp) => {
         this.rspListarIndividual = resp.data.data;
      });
      return this.rspListarIndividual;
   }

   //grupal
   async listarGrupalNombre(nombre: string): Promise<CarreraResponse[]> {
      await this.apiCarrera.listarGrupalNombre(nombre).then((resp) => {
         this.rspListarGrupalNombre = resp.data.data;
      });
      return this.rspListarGrupalNombre;
   }

   async listarGrupalActivos(): Promise<CarreraResponse[]> {
      await this.apiCarrera.listarGrupalActivos().then((resp) => {
         this.rspListarGrupalActivos = resp.data.data;
      });
      return this.rspListarGrupalActivos;
   }

   async llenarCombo(): Promise<Option[]> {
      await this.apiCarrera.listarGrupalActivos().then((resp) => {
         this.rspLlenarCombo.push({
            value: "0",
            label: "Selec. Opción",
         });
         resp.data.data.map((element: CarreraResponse) => {
            this.rspLlenarCombo.push({
               value: element.carrera_id,
               label: element.nombre,
            });
         });
      });
      return this.rspLlenarCombo;
   }

   obtenerIdDeURL(id: string): string {
      return typeof id === "undefined" ? "" : id;
   }
}
