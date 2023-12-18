export enum OpcionGestion {
   VISUALIZAR = 0,
   REGISTRAR = 1,
   EDITAR = 2,
}

export interface OpcionesGestionPros {
   tipo: OpcionGestion;
   nombre: string;
   color: `#${string}`;
   habilitarBotones: boolean;
   esEditable: boolean;
}

// const opcionesGestion: OpcionesGestionPros[] = [
//    {
//       tipo: OpcionGestion.VISUALIZAR,
//       habilitarBotones: true,
//       esEditable: false,
//    },
//    { tipo: OpcionGestion.REGISTRAR, habilitarBotones: false, esEditable: true },
//    { tipo: OpcionGestion.EDITAR, habilitarBotones: true, esEditable: true },
// ];

export function funValidarOpcionGestion(opcion: string): OpcionesGestionPros {
   if (typeof opcion === "undefined") {
      opcion = "0";
   }
   const nroOpcion: OpcionGestion = Number(opcion);
   if (nroOpcion === OpcionGestion.REGISTRAR) {
      return {
         tipo: OpcionGestion.REGISTRAR,
         nombre: "Registro",
         color: "#8bc34a",
         habilitarBotones: false,
         esEditable: true,
      };
   } else if (nroOpcion === OpcionGestion.EDITAR) {
      return {
         tipo: OpcionGestion.EDITAR,
         color: "#ff9800",
         nombre: "Edición",
         habilitarBotones: true,
         esEditable: true,
      };
   } else {
      return {
         tipo: OpcionGestion.VISUALIZAR,
         color: "#00bcd4",
         nombre: "Visualización",
         habilitarBotones: true,
         esEditable: false,
      };
   }
}
