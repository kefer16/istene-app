import { CarreraApi } from "../apis/carrera.api";
import { Option } from "../components/SelectCustom";
import {
   CarreraListarGrupalNombreResponse,
   CarreraListarIndividualResponse,
   CarreraResponse,
} from "../interfaces/responses/carrera.response";
import {
   CarreraActualizarIndividualRequest,
   CarreraRegistrarIndividualRequest,
} from "../interfaces/resquests/carrera.request";

export class CarreraService {
   private apiCarrera = new CarreraApi();

   private rspRegistrarIndivial: CarreraResponse = {} as CarreraResponse;
   private rspActualizarIndividual: CarreraResponse = {} as CarreraResponse;
   private rspListarIndividual: CarreraListarIndividualResponse =
      {} as CarreraListarIndividualResponse;

   private rspListarGrupalNombre: CarreraListarGrupalNombreResponse[] = [];
   private rspListarGrupalActivos: CarreraResponse[] = [];
   private rspLlenarCombo: Option[] = [];

   private rspListarIndividualNroActivos: number = 0;

   //individual
   async registrarIndividual(
      data: CarreraRegistrarIndividualRequest
   ): Promise<CarreraResponse> {
      await this.apiCarrera.registrarIndividual(data).then((resp) => {
         this.rspRegistrarIndivial = resp.data.data;
      });
      return this.rspRegistrarIndivial;
   }

   async actualizarIndividual(
      id: string,
      data: CarreraActualizarIndividualRequest
   ): Promise<CarreraResponse> {
      await this.apiCarrera.actualizarIndividual(id, data).then((resp) => {
         this.rspActualizarIndividual = resp.data.data;
      });
      return this.rspActualizarIndividual;
   }

   async listarIndividual(
      id: string
   ): Promise<CarreraListarIndividualResponse> {
      await this.apiCarrera.listarIndividual(id).then((resp) => {
         this.rspListarIndividual = resp.data.data;
      });
      return this.rspListarIndividual;
   }

   async listarIndividualNroActivos(): Promise<number> {
      await this.apiCarrera.listarIndividualNroActivos().then((resp) => {
         this.rspListarIndividualNroActivos = resp.data.data;
      });
      return this.rspListarIndividualNroActivos;
   }

   //grupal
   async listarGrupalNombre(
      nombre: string
   ): Promise<CarreraListarGrupalNombreResponse[]> {
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
            label: "-SELECCIONE-",
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

   async llenarComboFiltro(): Promise<Option[]> {
      await this.apiCarrera.listarGrupalActivos().then((resp) => {
         this.rspLlenarCombo.push({
            value: "-1",
            label: "TODOS",
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
