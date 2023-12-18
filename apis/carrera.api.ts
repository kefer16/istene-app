import axios, { AxiosResponse } from "axios";
import { CarreraEntity } from "../entities/carrera.entity";
import { personalizarMensajeError } from "../utils/funciones.util";

export class CarreraApi {
   //individual
   async registrarIndividual(data: CarreraEntity): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
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
      data: CarreraEntity
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               carrera_id: id,
            },
            headers: {
               "Content-Type": "application/json",
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
            params: {
               carrera_id: id,
            },
            headers: {
               "Content-Type": "application/json",
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

   //grupal
   async listarGrupalNombre(nombre: string): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               nombre: nombre,
            },
            headers: {
               "Content-Type": "application/json",
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
