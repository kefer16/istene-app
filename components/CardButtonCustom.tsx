import {
   View,
   Text,
   StyleProp,
   TextStyle,
   TouchableOpacity,
   useColorScheme,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
   styleTouchable?: StyleProp<TextStyle>;
   textTitle: string;
   textDescription: string;
   textFecha: string;
   textCarrera: string;
   onPress?: () => void;
}
const CardButtonCustom = ({
   styleTouchable,
   textTitle,
   textDescription,
   textFecha,
   textCarrera,
   onPress,
}: Props) => {
   const colorScheme = useColorScheme();
   return (
      <TouchableOpacity
         style={[
            styleTouchable,
            {
               padding: 15,
               display: "flex",
               flexDirection: "row",
               alignItems: "center",
               backgroundColor: Colors[colorScheme ?? "light"].card,
               borderRadius: 10,
               borderStyle: "solid",
               borderWidth: 1,
               borderColor: Colors[colorScheme ?? "light"].inputBorder,
            },
         ]}
         onPress={onPress}
      >
         <View style={{ width: "90%", flexDirection: "column" }}>
            <Text
               style={{
                  fontSize: 10,
                  fontFamily: "Poppins600",
                  color: Colors[colorScheme ?? "light"].textTitle,
               }}
            >
               {textTitle}
            </Text>
            <Text
               style={{
                  fontSize: 15,
                  fontFamily: "Poppins300",
                  color: Colors[colorScheme ?? "light"].textSubtitle,
               }}
            >
               {textDescription}
            </Text>
            <View
               style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
               }}
            >
               <Text
                  style={{
                     fontSize: 10,
                     fontFamily: "Poppins600",
                     color: Colors[colorScheme ?? "light"].textTitle,
                  }}
               >
                  {textFecha}
               </Text>
               <Text
                  style={{
                     fontSize: 10,
                     fontFamily: "Poppins300",
                     color: Colors[colorScheme ?? "light"].textSubtitle,
                  }}
               >
                  {textCarrera}
               </Text>
            </View>
         </View>
         <View
            style={{
               width: "10%",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            {/* <TouchableOpacity
               style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  backgroundColor: "#0000003f",
               }}
            >
               <Ionicons
                  style={{
                     fontSize: 15,
                     color: "#ffc107",
                  }}
                  name={"create"}
               />
            </TouchableOpacity> */}
            <TouchableOpacity
               style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  backgroundColor: "#0000003f",
               }}
            >
               <Ionicons
                  style={{
                     fontSize: 15,
                     color: "#f44336",
                  }}
                  name={"trash"}
               />
            </TouchableOpacity>
         </View>
      </TouchableOpacity>
   );
};

export default CardButtonCustom;
