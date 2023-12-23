import { CandidatoApi } from "../apis/candidato.api";
import {
   CandidatoListarGrupalDNIResponse,
   CandidatoListarIndividualResponse,
   CandidatoResponse,
} from "../interfaces/responses/candidato.response";
import {
   CandidatoActualizarRequest,
   CandidatoRequest,
} from "../interfaces/resquests/candidato.request";

export class CandidatoService {
   private apiCandidato = new CandidatoApi();

   private rspRegistrarIndivial: CandidatoResponse = {} as CandidatoResponse;
   private rspActualizarIndividual: CandidatoResponse = {} as CandidatoResponse;
   private rspListarIndividual: CandidatoListarIndividualResponse =
      {} as CandidatoListarIndividualResponse;

   private rspListarGrupalDNI: CandidatoListarGrupalDNIResponse[] = [];
   private rspListarGrupalActivos: CandidatoResponse[] = [];
   private rspListarIndividualCantidadPorEstado: number = 0;

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
      data: CandidatoActualizarRequest
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

   async listarIndividualCantidadPorEstado(
      abreviaturaEstado: string
   ): Promise<number> {
      await this.apiCandidato
         .listarIndividualCantidadPorEstado(abreviaturaEstado)
         .then((resp) => {
            this.rspListarIndividualCantidadPorEstado = resp.data.data;
         });
      return this.rspListarIndividualCantidadPorEstado;
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

   static obtenerColorEstado(abreviaturaEstado: string): `#${string}` {
      if (abreviaturaEstado === "PEND") {
         return "#ff9800";
      }
      if (abreviaturaEstado === "LLAM") {
         return "#00bcd4";
      }
      if (abreviaturaEstado === "CONF") {
         return "#8bc34a";
      }
      if (abreviaturaEstado === "RECH") {
         return "#f44336";
      }
      return "#000";
   }
}
