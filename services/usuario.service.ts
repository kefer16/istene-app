import { UsuarioApi } from "../apis/usuario.api";
import { Option } from "../components/SelectCustom";
import { UsuarioEntity } from "../entities/usuario.entity";
import {
   UsuarioListarGrupalActivosResponse,
   UsuarioListarIndividualResponse,
} from "../interfaces/responses/usuario.response";
import {
   ActualizarIndividualContraseniaRequest,
   LogeoUsuario,
} from "../interfaces/usuario.interface";

export class UsuarioService {
   private apiUsuario = new UsuarioApi();

   private rspLogearse: LogeoUsuario = {} as LogeoUsuario;
   private rspRegistrar: boolean = false;
   private rspActualizar: boolean = false;
   private rspListarIndividual: UsuarioListarIndividualResponse =
      {} as UsuarioListarIndividualResponse;
   private rspListarTodo: UsuarioEntity[] = [];
   private rspLlenarCombo: Option[] = [];
   private rspEliminarUno: boolean = false;
   private rspActualizarContrasenia: number = 0;

   async logearse(usuario: string, contrasenia: string): Promise<LogeoUsuario> {
      await this.apiUsuario.logearse(usuario, contrasenia).then((resp) => {
         this.rspLogearse = resp.data.data;
      });
      return this.rspLogearse;
   }

   async registrarIndividual(data: UsuarioEntity): Promise<boolean> {
      await this.apiUsuario.registrarIndividual(data).then((resp) => {
         this.rspRegistrar = resp.data.data;
      });
      return this.rspRegistrar;
   }

   async actualizarIndividual(
      usuario_id: string,
      data: UsuarioEntity
   ): Promise<boolean> {
      await this.apiUsuario
         .actualizarIndividual(usuario_id, data)
         .then((resp) => {
            this.rspActualizar = resp.data.data;
         });
      return this.rspActualizar;
   }

   async listarIndividual(
      id: string
   ): Promise<UsuarioListarIndividualResponse> {
      await this.apiUsuario.listarIndividual(id).then((resp) => {
         this.rspListarIndividual = resp.data.data;
      });
      return this.rspListarIndividual;
   }

   async actualizarIndividualContrasenia(
      id: string,
      data: ActualizarIndividualContraseniaRequest
   ): Promise<number> {
      await this.apiUsuario
         .actualizarIndividualContrasenia(id, data)
         .then((resp) => {
            this.rspActualizarContrasenia = resp.data.data;
         });
      return this.rspActualizarContrasenia;
   }

   async listarGrupal(): Promise<UsuarioEntity[]> {
      await this.apiUsuario.listarGrupal().then((resp) => {
         this.rspListarTodo = resp.data.data;
      });
      return this.rspListarTodo;
   }

   async llenarComboFiltro(): Promise<Option[]> {
      await this.apiUsuario.listarGrupalActivos().then((resp) => {
         this.rspLlenarCombo.push({
            value: "-1",
            label: "TODOS",
         });
         resp.data.data.map((element: UsuarioListarGrupalActivosResponse) => {
            this.rspLlenarCombo.push({
               value: element.usuario_id,
               label: element.usuario,
            });
         });
      });
      return this.rspLlenarCombo;
   }

   async eliminarIndividual(usuario_id: string): Promise<boolean> {
      await this.apiUsuario.eliminarIndividual(usuario_id).then((resp) => {
         this.rspEliminarUno = resp.data.data;
      });
      return this.rspEliminarUno;
   }
}
