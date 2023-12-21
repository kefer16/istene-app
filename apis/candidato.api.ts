import axios, { AxiosResponse } from "axios";
import { CandidatoEntity } from "../entities/candidato.entity";
import { personalizarMensajeError } from "../utils/funciones.util";
import { CandidatoRequest } from "../interfaces/resquests/candidato.request";

export class CandidatoApi {
   //individual
   async registrarIndividual(data: CandidatoRequest): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
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
      data: CandidatoEntity
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               candidato_id: id,
            },
            headers: {
               "Content-Type": "application/json",
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
            params: {
               candidato_id: id,
            },
            headers: {
               "Content-Type": "application/json",
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

   //grupal
   async listarGrupalDni(dni: string): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               dni: dni,
            },
            headers: {
               "Content-Type": "application/json",
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
