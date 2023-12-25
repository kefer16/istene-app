import axios, { AxiosResponse } from "axios";
import { ReniecEntity } from "../entities/reniec.entity";
import { personalizarMensajeError } from "../utils/funciones.util";
export class ReniecApi {
   async obtenerNombres(dni: string): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${ReniecEntity.bearer}`,
            },
            params: {
               dni: dni,
            },
         };
         return await axios.get(`${ReniecEntity.url}/buscar_dni`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
