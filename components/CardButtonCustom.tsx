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
   footerTextFecha: string;
   footerTextUsuario: string;
   etiquetaValor: string;
   etiquetaColor: `#${string}`;
   onPress?: () => void;
}
const CardButtonCustom = ({
   styleTouchable,
   textTitle,
   textDescription,
   footerTextFecha,
   footerTextUsuario,
   onPress,
   etiquetaValor,
   etiquetaColor,
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
         <View style={{ width: "100%", flexDirection: "column" }}>
            <View
               style={{
                  display: "flex",
                  // alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
               }}
            >
               <Text
                  style={{
                     fontSize: 10,
                     lineHeight: 13,
                     fontFamily: "Poppins600",
                     color: Colors[colorScheme ?? "light"].textTitle,
                  }}
               >
                  {textTitle.length <= 45
                     ? textTitle
                     : `${textTitle.substring(0, 44)}...`}
               </Text>
               <Text
                  style={{
                     backgroundColor: etiquetaColor,
                     fontSize: 10,
                     // lineHeight: 10,
                     fontFamily: "Poppins600",
                     padding: 4,
                     borderRadius: 5,
                     color: "#fff",
                  }}
               >
                  {etiquetaValor}
               </Text>
            </View>
            <Text
               style={{
                  fontSize: 15,
                  fontFamily: "Poppins300",
                  color: Colors[colorScheme ?? "light"].textSubtitle,
               }}
            >
               {textDescription.length <= 30
                  ? textDescription
                  : `${textDescription.substring(0, 29)}...`}
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
                  {footerTextFecha}
               </Text>
               <Text
                  style={{
                     fontSize: 10,
                     fontFamily: "Poppins300",
                     color: Colors[colorScheme ?? "light"].textSubtitle,
                  }}
               >
                  {`Editado por: ${footerTextUsuario}`}
               </Text>
            </View>
         </View>
         {/* <View
            style={{
               width: "10%",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}
         > */}
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
                     color: "#f44336",
                  }}
                  name={"trash"}
               />
            </TouchableOpacity> */}
         {/* </View> */}
      </TouchableOpacity>
   );
};

export default CardButtonCustom;
