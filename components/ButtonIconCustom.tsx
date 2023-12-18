import { TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

interface Props {
   iconName: any;
   iconColor: `#${string}`;
   onPress: () => void;
}

const ButtonIconCustom = ({ iconName, iconColor, onPress }: Props) => {
   const colorScheme = useColorScheme();

   return (
      <TouchableOpacity
         style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 40,
            height: 40,
            borderRadius: 5,
            backgroundColor: Colors[colorScheme ?? "light"].inputContainer,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: Colors[colorScheme ?? "light"].inputBorder,
         }}
         onPress={onPress}
      >
         <Ionicons
            style={{
               fontSize: 20,
               color: iconColor,
            }}
            name={iconName}
         />
      </TouchableOpacity>
   );
};

export default ButtonIconCustom;
