import { View, useColorScheme } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ContainerCustom from "../../../components/ContainerCustom";
import HeaderCustom from "../../../components/HeaderCustom";
import ContainerWebCustom from "../../../components/ContainerWebCustom";
import TitleCustom from "../../../components/TitleCustom";
import Colors from "../../../constants/Colors";
import InputPasswordCustom from "../../../components/InputPasswordCustom";
import ButtonCrudCustom from "../../../components/ButtonCrudCustom";
import { IsteneSesionContext } from "../../../components/sesion/Sesion.component";
import { UsuarioService } from "../../../services/usuario.service";
import { ActualizarIndividualContraseniaRequest } from "../../../interfaces/usuario.interface";
import { router } from "expo-router";

const cambiar_contrasenia = () => {
   const colorScheme = useColorScheme();
   const {
      obtenerSesion,
      isteneSesion,
      cerrarSesion,
      mostrarNotificacion,
      activarCarga,
   } = useContext(IsteneSesionContext);
   const [contraseniaActual, setContraseniaActual] = useState<string>("");
   const [contraseniaNueva, setContraseniaNueva] = useState<string>("");
   const [contraseniaNuevaRep, setContraseniaNuevaRep] = useState<string>("");
   const [esconderContraseniaActual, setEsconderContraseniaActual] =
      useState<boolean>(true);
   const [esconderContraseniaNueva, setEsconderContraseniaNueva] =
      useState<boolean>(true);
   const [esconderContraseniaNuevaRep, setEsconderContraseniaNuevaRep] =
      useState<boolean>(true);

   const funValidarCamposCorrectos = (): boolean => {
      if (!contraseniaActual) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese contraseña actual",
         });
         return false;
      }
      if (!contraseniaNueva) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese contraseña nueva",
         });
         return false;
      }
      if (!contraseniaNuevaRep) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Repita la contraseña nueva",
         });
         return false;
      }

      if (contraseniaNueva !== contraseniaNuevaRep) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Las contraseñas nuevas deben ser iguales",
         });
         return false;
      }

      if (contraseniaActual === contraseniaNueva) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "La contraseña nueva no puede ser igual que la antigua",
         });
         return false;
      }

      return true;
   };
   const funCambiarContrasenia = async (id: string) => {
      if (!funValidarCamposCorrectos()) {
         return;
      }

      const srvUsuario = new UsuarioService();
      const data: ActualizarIndividualContraseniaRequest = {
         contrasenia_actual: contraseniaActual,
         contrasenia_nueva: contraseniaNueva,
      };
      activarCarga(true);
      await srvUsuario
         .actualizarIndividualContrasenia(id, data)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               detalle:
                  "Se actualizó correctamente la contraseña, Inicia Sesion de nuevo",
            });
            cerrarSesion();
            router.replace("/");
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   useEffect(() => {
      const obtenerDatos = () => {
         obtenerSesion();
      };
      obtenerDatos();
   }, []);

   return (
      <ContainerCustom>
         <HeaderCustom
            title="Contraseña"
            isSecondaryPage={true}
            urlBack={"/(home)/configuracion"}
         />
         <ContainerWebCustom>
            <View
               style={{
                  flexDirection: "column",
                  padding: 10,
                  gap: 10,
                  backgroundColor: Colors[colorScheme ?? "light"].container,
               }}
            >
               <TitleCustom text="Cambiar Contraseña:" textSize={15} />
               <InputPasswordCustom
                  title="Contraseña Actual"
                  placeholder="Ingrese contraseña actual"
                  value={contraseniaActual}
                  functionChangeText={setContraseniaActual}
                  activePassword={esconderContraseniaActual}
                  functionActivePassword={() =>
                     setEsconderContraseniaActual(!esconderContraseniaActual)
                  }
                  inputIsRequired={true}
               />
               <InputPasswordCustom
                  title="Contraseña Nueva"
                  placeholder="Ingrese contraseña nueva"
                  value={contraseniaNueva}
                  functionChangeText={setContraseniaNueva}
                  activePassword={esconderContraseniaNueva}
                  functionActivePassword={() =>
                     setEsconderContraseniaNueva(!esconderContraseniaNueva)
                  }
                  inputIsRequired={true}
               />
               <InputPasswordCustom
                  title="Rep. Contraseña Nueva"
                  placeholder="Repita la contraseña nueva"
                  value={contraseniaNuevaRep}
                  functionChangeText={setContraseniaNuevaRep}
                  activePassword={esconderContraseniaNuevaRep}
                  functionActivePassword={() =>
                     setEsconderContraseniaNuevaRep(
                        !esconderContraseniaNuevaRep
                     )
                  }
                  inputIsRequired={true}
               />
               <ButtonCrudCustom
                  buttonBackgroundColor={"#F6A626"}
                  text={"Actualizar"}
                  onPress={() => {
                     funCambiarContrasenia(isteneSesion.usuario_id);
                  }}
               />
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
};

export default cambiar_contrasenia;
