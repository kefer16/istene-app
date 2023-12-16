import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
interface Props {
   title: string;
   text: string;
   quantity: number;
   iconName: any;
   viewBackgroundColor: string;
}
const CardCustom = ({
   title,
   text,
   quantity,
   iconName,
   viewBackgroundColor,
}: Props) => {
   return (
      <TouchableOpacity
         style={{
            flexDirection: "column",
            backgroundColor: viewBackgroundColor,
            borderRadius: 20,
            padding: 15,
            width: "48%",
         }}
      >
         <Text
            style={{
               color: "#fff",
               fontSize: 10,
               lineHeight: 13,
               fontFamily: "Poppins700",
            }}
         >
            {title}
         </Text>
         <View
            style={{
               display: "flex",
               height: 60,
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "baseline",

               // backgroundColor: "red",
            }}
         >
            <Text
               style={{
                  display: "flex",
                  color: "#fff",
                  fontSize: 30,
                  fontFamily: "Poppins700",
               }}
            >
               {quantity}
            </Text>
            <Ionicons
               style={{
                  color: "#ffffff8e",
                  textAlign: "center",
                  fontSize: 50,
                  // marginTop: 15,
               }}
               name={iconName}
            />
         </View>
      </TouchableOpacity>
   );
};

export default CardCustom;
