import { PostulanteApi } from "../apis/postulante.api";
import {
   PostulanteCarreraReporteListarGrupal,
   PostulanteListarGrupalDNIResponse,
   PostulanteListarIndividualResponse,
   PostulanteReportesListarGrupal,
   PostulanteResponse,
} from "../interfaces/responses/postulante.response";
import {
   PostulanteActualizarRequest,
   PostulanteRequest,
} from "../interfaces/resquests/postulante.request";

export class PostulanteService {
   private apiPostulante = new PostulanteApi();

   private rspRegistrarIndivial: PostulanteResponse = {} as PostulanteResponse;
   private rspActualizarIndividual: PostulanteResponse =
      {} as PostulanteResponse;
   private rspListarIndividual: PostulanteListarIndividualResponse =
      {} as PostulanteListarIndividualResponse;
   private rspEliminarIndividual: number = 0;

   private rspListarGrupalDNI: PostulanteListarGrupalDNIResponse[] = [];
   private rspListarGrupalActivos: PostulanteResponse[] = [];
   private rspListarGrupalReportesFiltro: PostulanteReportesListarGrupal[] = [];
   private rspListarIndividualCantidadPorEstado: number = 0;

   //individual
   async registrarIndividual(
      data: PostulanteRequest
   ): Promise<PostulanteResponse> {
      await this.apiPostulante.registrarIndividual(data).then((resp) => {
         this.rspRegistrarIndivial = resp.data.data;
      });
      return this.rspRegistrarIndivial;
   }

   async actualizarIndividual(
      id: string,
      data: PostulanteActualizarRequest
   ): Promise<PostulanteResponse> {
      await this.apiPostulante.actualizarIndividual(id, data).then((resp) => {
         this.rspActualizarIndividual = resp.data.data;
      });
      return this.rspActualizarIndividual;
   }

   async listarIndividual(
      id: string
   ): Promise<PostulanteListarIndividualResponse> {
      await this.apiPostulante.ListarIndividual(id).then((resp) => {
         this.rspListarIndividual = resp.data.data;
      });
      return this.rspListarIndividual;
   }

   async eliminarIndividual(id: string): Promise<number> {
      await this.apiPostulante.eliminarIndividual(id).then((resp) => {
         this.rspEliminarIndividual = resp.data.data;
      });
      return this.rspEliminarIndividual;
   }

   async listarIndividualCantidadPorEstado(
      abreviaturaEstado: string
   ): Promise<number> {
      await this.apiPostulante
         .listarIndividualCantidadPorEstado(abreviaturaEstado)
         .then((resp) => {
            this.rspListarIndividualCantidadPorEstado = resp.data.data;
         });
      return this.rspListarIndividualCantidadPorEstado;
   }

   //grupal
   async listarGrupalDni(
      dni: string,
      estadoPostulante: string
   ): Promise<PostulanteListarGrupalDNIResponse[]> {
      await this.apiPostulante
         .listarGrupalDni(dni, estadoPostulante)
         .then((resp) => {
            this.rspListarGrupalDNI = resp.data.data;
         });
      return this.rspListarGrupalDNI;
   }

   async listarGrupalReportesFiltro(
      fk_postulante_estado: string,
      fk_postulante_carrera: string,
      fk_usuario: string
   ): Promise<PostulanteReportesListarGrupal[]> {
      await this.apiPostulante
         .listarGrupalReportesFiltro(
            fk_postulante_estado,
            fk_postulante_carrera,
            fk_usuario
         )
         .then((resp) => {
            this.rspListarGrupalReportesFiltro = resp.data.data;
         });
      return this.rspListarGrupalReportesFiltro;
   }
   async listarGrupalActivos(): Promise<PostulanteResponse[]> {
      await this.apiPostulante.listarGrupalActivos().then((resp) => {
         this.rspListarGrupalActivos = resp.data.data;
      });
      return this.rspListarGrupalActivos;
   }

   obtenerIdDeURL(id: string): string {
      return typeof id === "undefined" ? "" : id;
   }

   obtenerFormatoHTML(
      nombreEstado: string,
      nombreCarrera: string,
      nombreUsuario: string,
      arrayPostulante: PostulanteReportesListarGrupal[]
   ): string {
      const HTML_head = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <link rel="stylesheet" href="style.css" />
         <title>Browser</title>
         <style>
            table {
                  font-family: arial, sans-serif;
                  border-collapse: collapse;
                  width: 100%;
            }

            td,
            th {
                  border: 1px solid #dddddd;
                  text-align: left;
                  padding: 8px;
            }

            tr:nth-child(even) {
                  background-color: #dddddd;
            }
         </style>
      </head>`;
      const HTML_body_table_head = `
      <body>
         <h1>
            Reporte de Postulantes
         </h1>
         <p>
            <b>ESTADO: </b>
            ${nombreEstado}
         </p>
         <p>
            <b>CARRERA: </b>
            ${nombreCarrera}
         </p>
         <p>
            <b>USUARIO REG: </b>
            ${nombreUsuario}
         </p>
         <table>
            <tr>
                  <th>N°</th>
                  <th>ESTADO</th>
                  <th>DNI</th>
                  <th>APE. PATERNO</th>
                  <th>APE. MATERNO</th>
                  <th>NOMBRES</th>
                  <th>OPERADOR</th>
                  <th>TELÉFONO</th>
                  <th>NRO OPCIÓN</th>
                  <th>CARRERA</th>
                  <th>USU. REG.</th>
            </tr>`;

      let HTML_body_table_rows = "";

      arrayPostulante.forEach((item: PostulanteReportesListarGrupal, index) => {
         if (item.lst_postulante_carrera.length > 1) {
            HTML_body_table_rows =
               HTML_body_table_rows +
               `
               <tr>
                  <td rowspan="${item.lst_postulante_carrera.length}">${
                  index + 1
               }</td>
                  <td rowspan="${item.lst_postulante_carrera.length}">${
                  item.cls_postulante_estado.nombre
               }</td>
                  <td rowspan="${item.lst_postulante_carrera.length}">${
                  item.dni
               }</td>
                  <td rowspan="${item.lst_postulante_carrera.length}">${
                  item.apellido_paterno
               }</td>
                  <td rowspan="${item.lst_postulante_carrera.length}">${
                  item.apellido_materno
               }</td>
                  <td rowspan="${item.lst_postulante_carrera.length}">${
                  item.nombre
               }</td>
                  <td rowspan="${item.lst_postulante_carrera.length}">${
                  item.cls_operador.nombre
               }</td>
                  <td rowspan="${item.lst_postulante_carrera.length}">${
                  item.telefono
               }</td>
                  <td>${item.lst_postulante_carrera[0].numero_opcion}</td>
                  <td>${item.lst_postulante_carrera[0].cls_carrera.nombre}</td>
                  <td rowspan="${item.lst_postulante_carrera.length}">${
                  item.cls_usuario.usuario
               }</td>
               </tr>`;

            item.lst_postulante_carrera.forEach(
               (item: PostulanteCarreraReporteListarGrupal, index) => {
                  if (index > 0) {
                     HTML_body_table_rows =
                        HTML_body_table_rows +
                        `
                     <tr> 
                        <td>${item.numero_opcion}</td>
                        <td>${item.cls_carrera.nombre}</td>
                     </tr>`;
                  }
               }
            );
         } else {
            HTML_body_table_rows =
               HTML_body_table_rows +
               `
            <tr>
               <td>${index + 1}</td>
               <td>${item.cls_postulante_estado.nombre}</td>
               <td>${item.dni}</td>
               <td>${item.apellido_paterno}</td>
               <td>${item.apellido_materno}</td>
               <td>${item.nombre}</td>
               <td>${item.cls_operador.nombre}</td>
               <td>${item.telefono}</td>
               <td>${item.lst_postulante_carrera[0].numero_opcion}</td>
               <td>${item.lst_postulante_carrera[0].cls_carrera.nombre}</td>
               <td>${item.cls_usuario.usuario}</td>
            </tr>
         `;
         }
      });
      const HTML_body_final = `
         </table>
      </body>
   </html>
   `;
      const HTML =
         HTML_head +
         HTML_body_table_head +
         HTML_body_table_rows +
         HTML_body_final;

      return HTML;
   }

   static obtenerColorEstado(abreviaturaEstado: string): `#${string}` {
      if (abreviaturaEstado === "PEND") {
         return "#ff9800";
      }
      if (abreviaturaEstado === "LLAM") {
         return "#00bcd4";
      }
      if (abreviaturaEstado === "CONF") {
         return "#8bc34a";
      }
      if (abreviaturaEstado === "RETI") {
         return "#f44336";
      }
      return "#000";
   }
}
