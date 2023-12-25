import axios, { AxiosResponse } from "axios";
import { UsuarioEntity } from "../entities/usuario.entity";
import { personalizarMensajeError } from "../utils/funciones.util";
import { ActualizarIndividualContraseniaRequest } from "../interfaces/usuario.interface";

export class UsuarioApi {
   async logearse(
      usuario: string,
      contrasenia: string
   ): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${UsuarioEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify({ usuario, contrasenia });
         return await axios.post(`${UsuarioEntity.url}/login`, body, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async registrarIndividual(data: UsuarioEntity): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${UsuarioEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.post(
            `${UsuarioEntity.url}/registrar_individual`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizarIndividual(
      ID: string,
      data: UsuarioEntity
   ): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${UsuarioEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               usuario_id: ID,
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${UsuarioEntity.url}/actualizar_individual`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizarIndividualContrasenia(
      ID: string,
      data: ActualizarIndividualContraseniaRequest
   ): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${UsuarioEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               usuario_id: ID,
            },
         };
         const body = JSON.stringify(data);
         return await axios.put(
            `${UsuarioEntity.url}/actualizar_individual_contrasenia`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
   async listarIndividual(ID: string): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${UsuarioEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               usuario_id: ID,
            },
         };

         return await axios.get(
            `${UsuarioEntity.url}/listar_individual`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async listarGrupal(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${UsuarioEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${UsuarioEntity.url}/listar_grupal`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async listarGrupalActivos(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${UsuarioEntity.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return await axios.get(
            `${UsuarioEntity.url}/listar_grupal_activos`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async eliminarIndividual(ID: string): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${UsuarioEntity.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               usuario_id: ID,
            },
         };
         return await axios.delete(
            `${UsuarioEntity.url}/eliminar_indivual`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
