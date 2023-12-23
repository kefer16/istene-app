import axios, { AxiosResponse } from "axios";
import { OperadorEntity } from "../entities/operador.entity";
import { personalizarMensajeError } from "../utils/funciones.util";

export class OperadorApi {
   async listarGrupal(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${OperadorEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };
         return await axios.get(`${OperadorEntity.url}/listar_grupal`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async listarGrupalActivos(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${OperadorEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return await axios.get(
            `${OperadorEntity.url}/listar_grupal_activos`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
