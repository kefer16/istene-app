import axios, { AxiosResponse } from "axios";
import { CandidatoEstadoEntity } from "../entities/candidato_estado.entity";
import { personalizarMensajeError } from "../utils/funciones.util";

export class CandidatoEstadoApi {
   async listarGrupal(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };
         return await axios.get(
            `${CandidatoEstadoEntity.url}/listar_grupal`,
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
            `${CandidatoEstadoEntity.url}/listar_grupal_activos`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
