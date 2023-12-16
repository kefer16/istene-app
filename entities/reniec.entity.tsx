import { RENIEC_URL, RENIEC_TOKEN } from "@env";

export class ReniecEntity {
   constructor(public dni: string = "") {}

   public static token = RENIEC_TOKEN ?? "";
   public static url_dni = `${RENIEC_URL ?? ""}/dni?numero=`;
}
