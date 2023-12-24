import axios, { AxiosResponse } from "axios";
import { PostulanteEstadoEntity } from "../entities/postulante_estado.entity";
import { personalizarMensajeError } from "../utils/funciones.util";

export class PostulanteEstadoApi {
   async listarGrupal(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${PostulanteEstadoEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };
         return await axios.get(
            `${PostulanteEstadoEntity.url}/listar_grupal`,
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
               Authorization: `Bearer ${PostulanteEstadoEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return await axios.get(
            `${PostulanteEstadoEntity.url}/listar_grupal_activos`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
