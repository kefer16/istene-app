import { ReniecApi } from "../apis/reniec.api";
import { ReniecReponse } from "../interfaces/responses/reniec.response";

export class ReniecService {
   private apiReniec = new ReniecApi();

   private rspObtenerNombres: ReniecReponse = {} as ReniecReponse;

   async obtenerNombres(dni: string): Promise<ReniecReponse> {
      await this.apiReniec.obtenerNombres(dni).then((resp) => {
         console.log("resp:", resp.data);

         this.rspObtenerNombres = resp.data;
      });
      return this.rspObtenerNombres;
   }
}
