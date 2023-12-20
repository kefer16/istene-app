import { createContext, useState } from "react";
import { LogeoUsuario } from "../../interfaces/usuario.interface";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
// import {  ToastAndroid } from "react-native";

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
      let result;
      if (Platform.OS === "web") {
         result = sessionStorage.getItem("sesion_istene");
      } else {
         result = await SecureStore.getItemAsync("sesion_istene");
      }

      if (result) {
         setIsteneSesion(JSON.parse(result));
         setPrivilegio(JSON.parse(result).cls_privilegio.abreviatura);
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

      if (Platform.OS === "web") {
         sessionStorage.setItem("sesion_istene", JSON.stringify(sesion));
      } else {
         await SecureStore.setItemAsync(
            "sesion_istene",
            JSON.stringify(sesion)
         );
      }

      setIsteneSesion(sesion);
   };

   const cerrarSesion = () => {
      if (Platform.OS === "web") {
         sessionStorage.removeItem("sesion_istene");
      } else {
         SecureStore.deleteItemAsync("sesion_istene");
      }

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

      if (Platform.OS === "android") {
         //    ToastAndroid.showWithGravityAndOffset(
         //       detalle,
         //       ToastAndroid.LONG,
         //       ToastAndroid.CENTER,
         //       25,
         //       50
         //    );
         Alert.alert(titulo, detalle);
      } else {
         window.alert(detalle);
      }
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
