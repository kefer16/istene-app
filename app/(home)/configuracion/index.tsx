import { View, Text } from "react-native";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ButtonOptionCustom from "../../../components/ButtonOptionCustom";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { IsteneSesionContext } from "../../../components/sesion/Sesion.component";
import Colors from "../../../constants/Colors";
import ContainerCustom from "../../../components/ContainerCustom";
import HeaderCustom from "../../../components/HeaderCustom";
import TitleCustom from "../../../components/TitleCustom";
import ContainerWebCustom from "../../../components/ContainerWebCustom";

const index = () => {
   const { cerrarSesion } = useContext(IsteneSesionContext);

   const colorScheme = useColorScheme();

   useEffect(() => {}, []);

   const funCerrarSesion = () => {
      cerrarSesion();
      router.replace("/");
   };

   const funIrScreenUsuario = () => {
      router.push("/(home)/configuracion/perfil");
   };
   const funIrScreenCambiarContrasenia = () => {
      router.push("/(home)/configuracion/cambiar_contrasenia");
   };

   return (
      <ContainerCustom>
         <HeaderCustom title="Configuración" isSecondaryPage={false} />
         <ContainerWebCustom>
            <View style={{ padding: 10, paddingVertical: 10, gap: 7 }}>
               <TitleCustom
                  // textStyle={{ marginTop: 10 }}
                  textSize={20}
                  text="Gestiona tus datos usuario"
               />
               <ButtonOptionCustom
                  iconName={"person-circle"}
                  textTitle="Perfil"
                  textDescription={"Editar perfil"}
                  onPress={funIrScreenUsuario}
               />

               <ButtonOptionCustom
                  iconName={"lock-closed"}
                  textTitle="Contraseña"
                  textDescription="Cambiar Contraseña"
                  onPress={funIrScreenCambiarContrasenia}
               />
               <TouchableOpacity
                  style={{
                     padding: 15,
                     display: "flex",
                     flexDirection: "row",
                     alignItems: "center",
                     borderRadius: 10,
                     backgroundColor: Colors[colorScheme ?? "light"].card,
                     shadowColor: "#970606c7",
                     shadowOffset: { width: -2, height: 5 },
                     shadowOpacity: 0.5,
                     shadowRadius: 3,
                     elevation: 5,
                  }}
                  onPress={funCerrarSesion}
               >
                  <Ionicons
                     style={{ marginRight: 10, fontSize: 25, color: "#EC3030" }}
                     name={"log-out"}
                  />
                  <Text
                     style={{
                        fontSize: 15,
                        fontFamily: "Poppins400",
                        color: "#EC3030",
                     }}
                  >
                     Cerrar Sesión
                  </Text>
               </TouchableOpacity>
               <Text
                  style={{
                     padding: 15,
                     fontSize: 10,
                     fontFamily: "Poppins300",
                     color: "#6f6f6f",
                  }}
               >
                  Version 1.0.1
               </Text>
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
};

export default index;
