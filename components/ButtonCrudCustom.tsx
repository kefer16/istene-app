import {
   View,
   Text,
   useColorScheme,
   TouchableOpacity,
   StyleProp,
   ViewStyle,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";

interface Props {
   text: string;
   onPress: () => void;
   buttonBackgroundColor: `#${string}`;
   styleButton?: StyleProp<ViewStyle>;
   isEnabled?: boolean;
}
const ButtonCrudCustom = ({
   styleButton,
   buttonBackgroundColor,
   text,
   onPress,
   isEnabled = true,
}: Props) => {
   const colorScheme = useColorScheme();
   return (
      <TouchableOpacity
         style={{ borderRadius: 10, overflow: "hidden" }}
         onPress={() => {
            isEnabled && onPress();
         }}
      >
         <View
            style={[
               {
                  width: "100%",
                  paddingVertical: 15,
                  backgroundColor: buttonBackgroundColor,
               },
               !isEnabled && {
                  opacity: 0.6,
               },
            ]}
         >
            <Text
               style={{
                  textAlign: "center",
                  color: Colors[colorScheme ?? "light"].buttonText,
                  fontSize: 16,
                  fontFamily: "Poppins600",
               }}
            >
               {text}
            </Text>
         </View>
      </TouchableOpacity>
   );
};

export default ButtonCrudCustom;
