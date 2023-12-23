import axios, { AxiosResponse } from "axios";
import { CandidatoEntity } from "../entities/candidato.entity";
import { personalizarMensajeError } from "../utils/funciones.util";
import {
   CandidatoActualizarRequest,
   CandidatoRequest,
} from "../interfaces/resquests/candidato.request";

export class CandidatoApi {
   //individual
   async registrarIndividual(data: CandidatoRequest): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${CandidatoEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.post(
            `${CandidatoEntity.url}/registrar_individual`,
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
      data: CandidatoActualizarRequest
   ): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${CandidatoEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               candidato_id: id,
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${CandidatoEntity.url}/actualizar_individual`,
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
               Authorization: `Bearer ${CandidatoEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               candidato_id: id,
            },
         };

         return await axios.get(
            `${CandidatoEntity.url}/listar_individual`,
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
               Authorization: `Bearer ${CandidatoEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               abreviatura: abreviaturaEstado,
            },
         };

         return await axios.get(
            `${CandidatoEntity.url}/listar_individual_cantidad_estado`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   //grupal
   async listarGrupalDni(dni: string): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${CandidatoEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               dni: dni,
            },
         };

         return await axios.get(
            `${CandidatoEntity.url}/listar_grupal_dni`,
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
               Authorization: `Bearer ${CandidatoEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return await axios.get(
            `${CandidatoEntity.url}/listar_grupal_activos`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
