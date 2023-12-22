import {
   StyleProp,
   Text,
   TextStyle,
   View,
   ViewStyle,
   useColorScheme,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";

interface Props {
   textStyle?: StyleProp<TextStyle>;
   text: string;
   textSize: number;
   textoAlternativo?: string;
}
const TitleCustom = ({
   textStyle,
   textSize,
   text,
   textoAlternativo,
}: Props) => {
   const colorScheme = useColorScheme();
   return (
      <View style={{ display: "flex", flexDirection: "row" }}>
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
         <Text
            style={{
               flex: 1,
               textAlign: "right",
               fontFamily: "Poppins300",
               fontSize: 10,
            }}
         >
            {textoAlternativo}
         </Text>
      </View>
   );
};

export default TitleCustom;
