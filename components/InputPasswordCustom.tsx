import { Dispatch, SetStateAction, useState } from "react";
import {
   View,
   Text,
   TextInput,
   StyleProp,
   ViewStyle,
   useColorScheme,
   TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constants/Colors";

interface Props {
   title: string;
   placeholder: string;
   value: string;
   activePassword: boolean;
   functionChangeText: Dispatch<SetStateAction<string>>;
   functionActivePassword: () => void;
   style?: StyleProp<ViewStyle>;
   inputIsRequired?: boolean;
   inputIsEditable?: boolean;
}

export default function InputPasswordCustom({
   title,
   placeholder,
   value,
   activePassword,
   functionChangeText,
   functionActivePassword,
   style,
   inputIsRequired = false,
   inputIsEditable = true,
}: Props) {
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
               focus && {
                  borderColor: "#007bff",
               },
               !inputIsEditable && {
                  opacity: 0.6,
               },
            ]}
            value={value}
            placeholder={placeholder}
            onChangeText={functionChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            keyboardType={"default"}
            maxLength={15}
            secureTextEntry={activePassword}
            autoComplete="off"
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
            onPress={functionActivePassword}
         >
            <Ionicons
               style={{ color: Colors[colorScheme ?? "light"].inputTitle }}
               name={activePassword ? "eye-outline" : "eye-off-outline"}
               size={20}
            />
         </TouchableOpacity>
      </View>
   );
}
