import axios, { AxiosResponse } from "axios";
import { CarreraEntity } from "../entities/carrera.entity";
import { personalizarMensajeError } from "../utils/funciones.util";
import {
   CarreraActualizarIndividualRequest,
   CarreraRegistrarIndividualRequest,
} from "../interfaces/resquests/carrera.request";

export class CarreraApi {
   //individual
   async registrarIndividual(
      data: CarreraRegistrarIndividualRequest
   ): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${CarreraEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.post(
            `${CarreraEntity.url}/registrar_individual`,
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
      data: CarreraActualizarIndividualRequest
   ): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${CarreraEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               carrera_id: id,
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${CarreraEntity.url}/actualizar_individual`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async listarIndividual(id: string): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${CarreraEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               carrera_id: id,
            },
         };

         return await axios.get(
            `${CarreraEntity.url}/listar_individual`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async listarIndividualNroActivos(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${CarreraEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return await axios.get(
            `${CarreraEntity.url}/listar_individual_nro_activos`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   //grupal
   async listarGrupalNombre(nombre: string): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${CarreraEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               nombre: nombre,
            },
         };

         return await axios.get(
            `${CarreraEntity.url}/listar_grupal_nombre`,
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
               Authorization: `Bearer ${CarreraEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return await axios.get(
            `${CarreraEntity.url}/listar_grupal_activos`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
