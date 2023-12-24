import { PostulanteApi } from "../apis/postulante.api";
import {
   PostulanteListarGrupalDNIResponse,
   PostulanteListarIndividualResponse,
   PostulanteResponse,
} from "../interfaces/responses/postulante.response";
import {
   PostulanteActualizarRequest,
   PostulanteRequest,
} from "../interfaces/resquests/postulante.request";

export class PostulanteService {
   private apiPostulante = new PostulanteApi();

   private rspRegistrarIndivial: PostulanteResponse = {} as PostulanteResponse;
   private rspActualizarIndividual: PostulanteResponse =
      {} as PostulanteResponse;
   private rspListarIndividual: PostulanteListarIndividualResponse =
      {} as PostulanteListarIndividualResponse;

   private rspListarGrupalDNI: PostulanteListarGrupalDNIResponse[] = [];
   private rspListarGrupalActivos: PostulanteResponse[] = [];
   private rspListarIndividualCantidadPorEstado: number = 0;

   //individual
   async registrarIndividual(
      data: PostulanteRequest
   ): Promise<PostulanteResponse> {
      await this.apiPostulante.registrarIndividual(data).then((resp) => {
         this.rspRegistrarIndivial = resp.data.data;
      });
      return this.rspRegistrarIndivial;
   }

   async actualizarIndividual(
      id: string,
      data: PostulanteActualizarRequest
   ): Promise<PostulanteResponse> {
      await this.apiPostulante.actualizarIndividual(id, data).then((resp) => {
         this.rspActualizarIndividual = resp.data.data;
      });
      return this.rspActualizarIndividual;
   }

   async listarIndividual(
      id: string
   ): Promise<PostulanteListarIndividualResponse> {
      await this.apiPostulante.ListarIndividual(id).then((resp) => {
         this.rspListarIndividual = resp.data.data;
      });
      return this.rspListarIndividual;
   }

   async listarIndividualCantidadPorEstado(
      abreviaturaEstado: string
   ): Promise<number> {
      await this.apiPostulante
         .listarIndividualCantidadPorEstado(abreviaturaEstado)
         .then((resp) => {
            this.rspListarIndividualCantidadPorEstado = resp.data.data;
         });
      return this.rspListarIndividualCantidadPorEstado;
   }

   //grupal
   async listarGrupalDni(
      dni: string,
      estadoPostulante: string
   ): Promise<PostulanteListarGrupalDNIResponse[]> {
      await this.apiPostulante
         .listarGrupalDni(dni, estadoPostulante)
         .then((resp) => {
            this.rspListarGrupalDNI = resp.data.data;
         });
      return this.rspListarGrupalDNI;
   }

   async listarGrupalActivos(): Promise<PostulanteResponse[]> {
      await this.apiPostulante.listarGrupalActivos().then((resp) => {
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
      if (abreviaturaEstado === "RETI") {
         return "#f44336";
      }
      return "#000";
   }
}
