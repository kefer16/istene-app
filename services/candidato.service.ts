import { CandidatoApi } from "../apis/candidato.api";
import { CandidatoEntity } from "../entities/candidato.entity";
import {
   CandidatoListarGrupalDNIResponse,
   CandidatoListarIndividualResponse,
   CandidatoResponse,
} from "../interfaces/responses/candidato.response";
import { CandidatoRequest } from "../interfaces/resquests/candidato.request";

export class CandidatoService {
   private apiCandidato = new CandidatoApi();

   private rspRegistrarIndivial: CandidatoResponse = {} as CandidatoResponse;
   private rspActualizarIndividual: CandidatoResponse = {} as CandidatoResponse;
   private rspListarIndividual: CandidatoListarIndividualResponse =
      {} as CandidatoListarIndividualResponse;

   private rspListarGrupalDNI: CandidatoListarGrupalDNIResponse[] = [];
   private rspListarGrupalActivos: CandidatoResponse[] = [];

   //individual
   async registrarIndividual(
      data: CandidatoRequest
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

   async listarIndividual(
      id: string
   ): Promise<CandidatoListarIndividualResponse> {
      await this.apiCandidato.ListarIndividual(id).then((resp) => {
         this.rspListarIndividual = resp.data.data;
      });
      return this.rspListarIndividual;
   }

   //grupal
   async listarGrupalDni(
      dni: string
   ): Promise<CandidatoListarGrupalDNIResponse[]> {
      await this.apiCandidato.listarGrupalDni(dni).then((resp) => {
         this.rspListarGrupalDNI = resp.data.data;
      });
      return this.rspListarGrupalDNI;
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
