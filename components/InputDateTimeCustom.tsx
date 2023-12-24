import {
   Text,
   ViewStyle,
   StyleProp,
   TouchableOpacity,
   useColorScheme,
   View,
   TextInput,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { formatoFecha } from "../utils/funciones.util";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
   title: string;
   value: string;
   functionChangeText: Dispatch<SetStateAction<string>>;
   style?: StyleProp<ViewStyle>;
   inputIsRequired?: boolean;
   inputIsEditable?: boolean;
}

const InputDateTimeCustom = ({
   title,
   value,
   functionChangeText,
   inputIsRequired = false,
   inputIsEditable = true,
}: Props) => {
   const colorScheme = useColorScheme();
   const [focus, setfocus] = useState<boolean>(false);
   const onFocus = () => {
      setfocus(true);
   };
   const onBlur = () => {
      setfocus(false);
   };
   return (
      <View>
         <TextInput
            editable={inputIsEditable}
            placeholderTextColor={
               Colors[colorScheme ?? "light"].InputTextPlaceHolder
            }
            style={[
               {
                  display: "flex",
                  width: "100%",
                  fontSize: 15,
                  lineHeight: 17,
                  color: Colors[colorScheme ?? "light"].inputText,
                  fontFamily: "Poppins300",
                  paddingTop: 20,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  paddingRight: 50,
                  borderRadius: 5,
                  backgroundColor:
                     Colors[colorScheme ?? "light"].inputContainer,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: Colors[colorScheme ?? "light"].inputBorder,
               },

               !inputIsEditable && {
                  opacity: 0.5,
                  backgroundColor:
                     colorScheme === "light" ? "#00000020" : "#ffffff40",
               },
            ]}
            value={formatoFecha(value.toString())}
            onChangeText={functionChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
         />
         <View
            style={{
               position: "absolute",
               top: 10,
               left: 10,
               zIndex: 1,
               flexDirection: "row",
            }}
         >
            <Text
               style={[
                  {
                     fontSize: 11,
                     lineHeight: 13,
                     textAlign: "left",
                     color: Colors[colorScheme ?? "light"].inputTitle,
                     fontFamily: "Poppins500",
                  },
                  focus && {
                     color: "#007bff",
                  },
               ]}
            >
               {title}
            </Text>
            {inputIsRequired && (
               <Text
                  style={[
                     {
                        fontSize: 11,
                        lineHeight: 13,
                        color: "#f44336",
                     },
                     focus && {
                        color: "#007bff",
                     },
                  ]}
               >
                  {` *`}{" "}
               </Text>
            )}
         </View>

         <TouchableOpacity
            style={{
               position: "absolute",
               top: 5,
               right: 10,
               zIndex: 1,
               width: 50,
               height: 50,
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            <Ionicons
               style={{
                  color: Colors[colorScheme ?? "light"].inputTitle,
               }}
               name={"calendar"}
               size={20}
            />
         </TouchableOpacity>
      </View>
   );
};

export default InputDateTimeCustom;
