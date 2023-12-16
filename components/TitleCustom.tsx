import {
   StyleProp,
   Text,
   TextStyle,
   ViewStyle,
   useColorScheme,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";

interface Props {
   textStyle?: StyleProp<TextStyle>;
   text: string;
   textSize: number;
}
const TitleCustom = ({ textStyle, textSize, text }: Props) => {
   const colorScheme = useColorScheme();
   return (
      <Text
         style={[
            textStyle,
            {
               fontSize: textSize,
               lineHeight: textSize + 6,
               color: Colors[colorScheme ?? "light"].textTitle,
               fontFamily: "Poppins700",
            },
         ]}
      >
         {text}
      </Text>
   );
};

export default TitleCustom;
