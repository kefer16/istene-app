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
         console.log(`${ReniecEntity.url_dni}${dni}`);

         return await axios.get(`${ReniecEntity.url_dni}${dni}`, config);
      } catch (error: any) {
         error.message = error.response.data.error.message;
         return Promise.reject(error);
      }
   }
}
