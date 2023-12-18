import { CandidatoApi } from "../apis/candidato.api";
import { CandidatoEntity } from "../entities/candidato.entity";
import { CandidatoResponse } from "../interfaces/responses/candidato.response";

export class CandidatoService {
   private apiCandidato = new CandidatoApi();

   private rspRegistrarIndivial: CandidatoResponse = {} as CandidatoResponse;
   private rspActualizarIndividual: CandidatoResponse = {} as CandidatoResponse;
   private rspListarIndividual: CandidatoResponse = {} as CandidatoResponse;

   private rspListarGrupal: CandidatoResponse[] = [];
   private rspListarGrupalActivos: CandidatoResponse[] = [];

   //individual
   async registrarIndividual(
      data: CandidatoEntity
   ): Promise<CandidatoResponse> {
      await this.apiCandidato.registrarIndividual(data).then((resp) => {
         this.rspRegistrarIndivial = resp.data.data;
      });
      return this.rspRegistrarIndivial;
   }

   async actualizarIndividual(
      id: string,
      data: CandidatoEntity
   ): Promise<CandidatoResponse> {
      await this.apiCandidato.actualizarIndividual(id, data).then((resp) => {
         this.rspActualizarIndividual = resp.data.data;
      });
      return this.rspActualizarIndividual;
   }

   async listarIndividual(id: string): Promise<CandidatoResponse> {
      await this.apiCandidato.ListarIndividual(id).then((resp) => {
         this.rspListarIndividual = resp.data.data;
      });
      return this.rspListarIndividual;
   }

   //grupal
   async listarGrupal(): Promise<CandidatoResponse[]> {
      await this.apiCandidato.listarGrupal().then((resp) => {
         this.rspListarGrupal = resp.data.data;
      });
      return this.rspListarGrupal;
   }

   async listarGrupalActivos(): Promise<CandidatoResponse[]> {
      await this.apiCandidato.listarGrupalActivos().then((resp) => {
         this.rspListarGrupalActivos = resp.data.data;
      });
      return this.rspListarGrupalActivos;
   }

   obtenerIdDeURL(id: string): string {
      return typeof id === "undefined" ? "" : id;
   }
}
