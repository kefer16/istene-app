import {
   View,
   Text,
   KeyboardTypeOptions,
   ViewStyle,
   TextStyle,
   StyleProp,
   useColorScheme,
   TextInput,
   TouchableOpacity,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
interface Props {
   title: string;
   placeholder: string;
   value: string;
   keyboardType: KeyboardTypeOptions;
   functionChangeText: Dispatch<SetStateAction<string>>;
   funButtonSearch: () => void;
   styleContainer?: StyleProp<ViewStyle>;
   styleInput?: StyleProp<TextStyle>;
   maxLength?: number;
   inputIsRequired?: boolean;
   inputIsEditable?: boolean;
}
const InputTextSearchCustom = ({
   title,
   placeholder,
   value,
   functionChangeText,
   funButtonSearch,
   styleContainer,
   styleInput,
   keyboardType,
   maxLength,
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
   const funCopiarAPortaPapeles = async () => {
      await Clipboard.setStringAsync(value);
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
                  // elevation: 3,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: Colors[colorScheme ?? "light"].inputBorder,
               },
               focus && {
                  borderColor: "#007bff",
               },
               !inputIsEditable && {
                  opacity: 0.5,
                  backgroundColor:
                     colorScheme === "light" ? "#00000020" : "#ffffff40",
               },
            ]}
            value={value}
            placeholder={placeholder}
            onChangeText={functionChangeText}
            onFocus={onFocus}
            onSubmitEditing={funButtonSearch}
            onBlur={onBlur}
            keyboardType={keyboardType}
            maxLength={maxLength}
         />
         <View
            style={{
               position: "absolute",
               top: 10,
               left: 10,
               zIndex: 1,
               // width: "100%",
               flexDirection: "row",
               // backgroundColor: "green",
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
         <View
            style={{
               flexDirection: "row",
               gap: 5,
               position: "absolute",
               top: 15,
               right: 10,
               zIndex: 1,
            }}
         >
            <TouchableOpacity
               style={{
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // backgroundColor: "red",
               }}
               onPress={() => {
                  inputIsEditable && funButtonSearch();
               }}
            >
               <Ionicons
                  style={{ color: Colors[colorScheme ?? "light"].inputTitle }}
                  name={"md-search-outline"}
                  size={20}
               />
            </TouchableOpacity>
            {!inputIsEditable && (
               <TouchableOpacity
                  style={{
                     width: 30,
                     height: 30,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     // borderStyle:1,
                  }}
                  onPress={funCopiarAPortaPapeles}
               >
                  <Ionicons
                     style={{
                        color: Colors[colorScheme ?? "light"].inputTitle,
                     }}
                     name={"copy-outline"}
                     size={20}
                  />
               </TouchableOpacity>
            )}
         </View>
      </View>
   );
};

export default InputTextSearchCustom;
