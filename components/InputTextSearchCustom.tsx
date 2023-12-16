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
   inputIsEditable,
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
      <View
         style={[
            {
               width: "100%",
               padding: 10,
               borderRadius: 5,
               backgroundColor: Colors[colorScheme ?? "light"].inputContainer,
               elevation: 5,
               borderStyle: "solid",
               borderWidth: 2,
               borderColor: Colors[colorScheme ?? "light"].inputContainer,
            },
            focus && {
               borderColor: "#007bff",
            },
         ]}
      >
         <Text
            style={[
               {
                  width: "100%",
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
               },
               styleInput,
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
               // backgroundColor: "red",
            }}
            onPress={funButtonSearch}
         >
            <Ionicons
               style={{ color: Colors[colorScheme ?? "light"].inputTitle }}
               name={"md-search-outline"}
               size={20}
            />
         </TouchableOpacity>
      </View>
   );
};

export default InputTextSearchCustom;
