import axios, { AxiosResponse } from "axios";
import { PostulanteEntity } from "../entities/postulante.entity";
import { personalizarMensajeError } from "../utils/funciones.util";
import {
   PostulanteActualizarRequest,
   PostulanteRequest,
} from "../interfaces/resquests/postulante.request";

export class PostulanteApi {
   //individual
   async registrarIndividual(data: PostulanteRequest): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${PostulanteEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.post(
            `${PostulanteEntity.url}/registrar_individual`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizarIndividual(
      id: string,
      data: PostulanteActualizarRequest
   ): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${PostulanteEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               postulante_id: id,
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${PostulanteEntity.url}/actualizar_individual`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async ListarIndividual(id: string): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${PostulanteEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               postulante_id: id,
            },
         };

         return await axios.get(
            `${PostulanteEntity.url}/listar_individual`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async listarIndividualCantidadPorEstado(
      abreviaturaEstado: string
   ): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${PostulanteEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               abreviatura: abreviaturaEstado,
            },
         };

         return await axios.get(
            `${PostulanteEntity.url}/listar_individual_cantidad_estado`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   //grupal
   async listarGrupalDni(
      dni: string,
      estadoPostulante: string
   ): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${PostulanteEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               dni: dni,
               fk_postulante_estado: estadoPostulante,
            },
         };

         return await axios.get(
            `${PostulanteEntity.url}/listar_grupal_dni`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async listarGrupalActivos(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${PostulanteEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return await axios.get(
            `${PostulanteEntity.url}/listar_grupal_activos`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
