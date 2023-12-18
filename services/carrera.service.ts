import { CarreraApi } from "../apis/carrera.api";
import { CarreraEntity } from "../entities/carrera.entity";
import { CarreraResponse } from "../interfaces/responses/carrera.response";

export class CarreraService {
   private apiCarrera = new CarreraApi();

   private rspRegistrarIndivial: CarreraResponse = {} as CarreraResponse;
   private rspActualizarIndividual: CarreraResponse = {} as CarreraResponse;
   private rspListarIndividual: CarreraResponse = {} as CarreraResponse;

   private rspListarGrupalNombre: CarreraResponse[] = [];
   private rspListarGrupalActivos: CarreraResponse[] = [];

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

   obtenerIdDeURL(id: string): string {
      return typeof id === "undefined" ? "" : id;
   }
}
