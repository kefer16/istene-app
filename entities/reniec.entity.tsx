import { API_URL, BEARER_TOKEN } from "@env";
const ENV_API_URL: string = API_URL ?? "";
const ENV_BEARER_TOKEN: string = BEARER_TOKEN ?? "";

export class ReniecEntity {
   constructor(public dni: string = "") {}
   public static bearer = ENV_BEARER_TOKEN;
   public static url = `${ENV_API_URL}/reniec`;
}
