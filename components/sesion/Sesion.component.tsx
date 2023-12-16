import { createContext, useState } from "react";
import { LogeoUsuario } from "../../interfaces/usuario.interface";
import { ToastAndroid } from "react-native";
import * as SecureStore from "expo-secure-store";

export interface NotificacionProps {
   tipo: "success" | "info" | "warn" | "error" | undefined;
   detalle: string;
}
export interface InsteneSesionContextProps {
   isteneSesion: LogeoUsuario;
   privilegio: privilegio;
   obtenerSesion: () => void;
   guardarSesion: (sesion: LogeoUsuario) => void;
   cerrarSesion: () => void;
   mostrarNotificacion: (prosp: NotificacionProps) => void;
}

export const IsteneSesionContext = createContext<InsteneSesionContextProps>(
   {} as InsteneSesionContextProps
);
export type privilegio = "ADM" | "USU" | "INV";

export const SesionProvider = ({ children }: any) => {
   const [privilegio, setPrivilegio] = useState<privilegio>("INV");
   const [isteneSesion, setIsteneSesion] = useState<LogeoUsuario>(
      {} as LogeoUsuario
   );

   const obtenerSesion = async () => {
      const result = await SecureStore.getItemAsync("sesion_istene");
      console.log("result", result);

      if (result) {
         setIsteneSesion(JSON.parse(result));
         setPrivilegio(JSON.parse(result).cls_privilegio.abreviatura);
      } else {
         console.log("No se obtuvo la llave");
      }
   };

   const guardarSesion = async (sesion: LogeoUsuario) => {
      sesion = {
         usuario_id: sesion.usuario_id,
         usuario: sesion.usuario,
         correo: sesion.correo,
         nombre: sesion.nombre,
         apellido: sesion.apellido,
         direccion: sesion.direccion,
         telefono: sesion.telefono,
         foto: "",
         cls_privilegio: {
            privilegio_id: sesion.cls_privilegio.privilegio_id,
            tipo: sesion.cls_privilegio.tipo,
            abreviatura: sesion.cls_privilegio.abreviatura,
         },
      };
      await SecureStore.setItemAsync("sesion_istene", JSON.stringify(sesion));
      setIsteneSesion(sesion);
   };

   const cerrarSesion = () => {
      SecureStore.deleteItemAsync("sesion_istene");
      setIsteneSesion({
         usuario_id: "",
         usuario: "",
         correo: "",
         nombre: "",
         apellido: "",
         direccion: "",
         telefono: "",
         foto: "",
         cls_privilegio: {
            privilegio_id: "",
            tipo: "",
            abreviatura: "INV",
         },
      });
      setPrivilegio("INV");
   };

   const mostrarNotificacion = ({ tipo, detalle }: NotificacionProps) => {
      let titulo = "";
      let pegado = false;

      if (detalle.substring(0, 6) === "[warn]") {
         tipo = "warn";
         detalle = detalle.substring(6);
      }

      if (tipo === "error") {
         titulo = "Error";
         pegado = true;
      }
      if (tipo === "warn") {
         titulo = "Alerta";
         pegado = false;
      }
      if (tipo === "success") {
         titulo = "Éxito";
         pegado = false;
      }

      ToastAndroid.showWithGravityAndOffset(
         detalle,
         ToastAndroid.LONG,
         ToastAndroid.TOP,
         25,
         50
      );
   };

   return (
      <IsteneSesionContext.Provider
         value={{
            isteneSesion,
            privilegio,
            obtenerSesion,
            guardarSesion,
            cerrarSesion,
            mostrarNotificacion,
         }}
      >
         {children}
      </IsteneSesionContext.Provider>
   );
};
