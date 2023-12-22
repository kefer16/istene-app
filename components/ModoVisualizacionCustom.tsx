import { Text, StyleProp, TextStyle, useColorScheme } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
interface Props {
   textStyle?: StyleProp<TextStyle>;
   text: string;
   textSize: number;
}
const ModoVisualizacionCustom = ({ textStyle, textSize, text }: Props) => {
   const colorScheme = useColorScheme();
   return (
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
   );
};

export default ModoVisualizacionCustom;
