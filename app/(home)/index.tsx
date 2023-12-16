import ContainerCustom from "../../components/ContainerCustom";
import HeaderCustom from "../../components/HeaderCustom";
import { useContext } from "react";
import { IsteneSesionContext } from "../../components/sesion/Sesion.component";
import { Text, View } from "react-native";

export default function TabOneScreen() {
   const { isteneSesion } = useContext(IsteneSesionContext);
   return (
      <ContainerCustom>
         <HeaderCustom
            title={`Bienvenido ${isteneSesion.usuario} `}
            isSecondaryPage={false}
         />
         <View
            style={{
               flex: 1,
               flexDirection: "column",
               paddingHorizontal: 20,
               gap: 10,
            }}
         >
            <Text>¿Que deseas hacer hoy?</Text>
         </View>
      </ContainerCustom>
   );
}
