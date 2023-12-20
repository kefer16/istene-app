import { View, Text, Platform } from "react-native";
import React from "react";

const index = () => {
   return (
      <View>
         <Text>Calendario</Text>
         {Platform.OS === "web" && <input type="date" />}
      </View>
   );
};

export default index;
