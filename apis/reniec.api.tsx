import axios, { AxiosResponse } from "axios";
import { ReniecEntity } from "../entities/reniec.entity";
export class ReniecApi {
   async obtenerNombres(dni: string): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
               Authorization: `Bearer ${ReniecEntity.token}`,
            },
         };
         return await axios.get(`${ReniecEntity.url_dni}${dni}`, config);
      } catch (error: any) {
         error.message = error.response.data.message;
         return Promise.reject(error);
      }
   }
}
