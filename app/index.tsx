import { Text, View, Image, useColorScheme, Platform } from "react-native";
import InputTextCustom from "../components/InputTextCustom";
import { useState, useContext } from "react";
import InputPasswordCustom from "../components/InputPasswordCustom";
import { Link } from "expo-router";
import { UsuarioService } from "../services/usuario.service";
import { LogeoUsuario } from "../interfaces/usuario.interface";
import { router } from "expo-router";
import { IsteneSesionContext } from "../components/sesion/Sesion.component";
import ContainerCustom from "../components/ContainerCustom";
import Colors from "../constants/Colors";
import ButtonCustom from "../components/ButtonCustom";
import ContainerWebCustom from "../components/ContainerWebCustom";

export default function LoginScreen() {
   const { mostrarNotificacion, guardarSesion, activarCarga } =
      useContext(IsteneSesionContext);

   const colorScheme = useColorScheme();

   const [usuario, setUsuario] = useState<string>("");
   const [esconderContrasenia, setEsconderContrasenia] =
      useState<boolean>(true);
   const [contrasenia, setContrasenia] = useState<string>("");

   const funIniciarSesion = async () => {
      if (!usuario) {
         mostrarNotificacion({ tipo: "success", detalle: "Ingrese usuario" });

         return;
      }
      if (!contrasenia) {
         mostrarNotificacion({
            tipo: "success",
            detalle: "Ingrese una contraseña",
         });

         return;
      }

      const srvUsuario = new UsuarioService();
      activarCarga(true);
      await srvUsuario
         .logearse(usuario, contrasenia)
         .then((resp: LogeoUsuario) => {
            mostrarNotificacion({
               tipo: "success",
               detalle: `Hola Bienvenido ${resp.usuario}`,
            });

            guardarSesion(resp);
            router.replace("/(home)/inicio");
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   return (
      <ContainerCustom>
         <ContainerWebCustom>
            <View
               style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: Platform.OS === "android" ? 100 : 50,
                  marginBottom: 50,
                  marginHorizontal: "auto",
                  width: "100%",
                  height: 80,
                  alignSelf: "center",
               }}
            >
               <Image
                  style={[
                     Platform.OS === "android" && {
                        width: "80%",
                        height: 80,
                     },
                  ]}
                  source={require("../assets/logo/logo.png")}
               />
            </View>

            <Text
               style={{
                  fontSize: 30,
                  lineHeight: 36,
                  color: Colors[colorScheme ?? "light"].textTitle,
                  textAlign: "center",
                  fontFamily: "Poppins900",
               }}
            >
               Bienvenido,
            </Text>
            <Text
               style={{
                  fontSize: 20,
                  lineHeight: 22,
                  color: Colors[colorScheme ?? "light"].textSubtitle,
                  textAlign: "center",
                  fontFamily: "Poppins400",
                  marginBottom: 50,
               }}
            >
               a ISTENE APP
            </Text>

            <View
               style={{
                  flex: 1,
                  flexDirection: "column",
                  paddingHorizontal: 20,
                  gap: 10,
               }}
            >
               <InputTextCustom
                  styleInput={{ textTransform: "lowercase" }}
                  title="Usuario"
                  placeholder="Ingrese usuario"
                  value={usuario}
                  functionChangeText={setUsuario}
                  keyboardType="default"
                  maxLength={15}
               />

               <InputPasswordCustom
                  title="Contraseña"
                  placeholder="Ingrese contraseña"
                  value={contrasenia}
                  functionChangeText={setContrasenia}
                  activePassword={esconderContrasenia}
                  functionActivePassword={() =>
                     setEsconderContrasenia(!esconderContrasenia)
                  }
               />

               {/* <Text
                  style={{
                     width: "100%",
                     textAlign: "right",
                     color: Colors[colorScheme ?? "light"].text,
                     fontSize: 13,
                     fontFamily: "Poppins400",
                     textDecorationLine: "underline",
                     marginBottom: 10,
                  }}
               >
                  Has olvidado tu contraseña?
               </Text> */}
               <ButtonCustom text="Iniciar Sesión" onPress={funIniciarSesion} />

               <View
                  style={{
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "center",
                     marginTop: 20,
                  }}
               >
                  <Text
                     style={{
                        color: Colors[colorScheme ?? "light"].text,
                        fontSize: 13,
                        fontFamily: "Poppins400",
                     }}
                  >
                     Aun no tienes cuenta?
                  </Text>
                  <Link
                     href="/registro"
                     style={{
                        color: Colors[colorScheme ?? "light"].text,
                        marginLeft: 10,
                        fontSize: 13,
                        fontFamily: "Poppins400",
                        textDecorationLine: "underline",
                     }}
                  >
                     <Text>Regístrate</Text>
                  </Link>
               </View>
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
}
