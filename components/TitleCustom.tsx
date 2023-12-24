import { StyleProp, Text, TextStyle, View, useColorScheme } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

interface Props {
   textStyle?: StyleProp<TextStyle>;
   text: string;
   textSize: number;
   usuarioActualizacion?: string;
   fechaActualizacion?: string;
}
const TitleCustom = ({
   textStyle,
   textSize,
   text,
   usuarioActualizacion,
   fechaActualizacion,
}: Props) => {
   const colorScheme = useColorScheme();
   return (
      <View
         style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
         <Text
            style={[
               {
                  fontSize: textSize,
                  lineHeight: textSize + 6,
                  color: Colors[colorScheme ?? "light"].textTitle,
                  fontFamily: "Poppins700",
               },
               textStyle,
            ]}
         >
            {text}
         </Text>

         {(usuarioActualizacion || fechaActualizacion) && (
            <Text
               style={{
                  flex: 1,
                  textAlign: "right",
                  fontFamily: "Poppins300",
                  fontSize: 10,
                  color: Colors[colorScheme ?? "light"].textTitle,
               }}
            >
               {`Editado por: ${usuarioActualizacion} - ${fechaActualizacion}`}
            </Text>
         )}
      </View>
   );
};

export default TitleCustom;
