import { Platform, View, useColorScheme } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const ContainerWebCustom = (props: any) => {
   const colorScheme = useColorScheme();
   return (
      <View
         style={[
            {
               flex: 1,
               backgroundColor: Colors[colorScheme ?? "light"].container,
            },
            Platform.OS === "web" && {
               marginHorizontal: "auto",
               width: 700,
            },
         ]}
      >
         {props.children}
      </View>
   );
};

export default ContainerWebCustom;
