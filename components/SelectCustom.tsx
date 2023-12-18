import {
   Text,
   StyleProp,
   ViewStyle,
   TouchableOpacity,
   useColorScheme,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Colors from "../constants/Colors";

interface Props {
   title: string;
   options: Option[];
   value: string;
   onValueChange: Dispatch<SetStateAction<string>>;
   style?: StyleProp<ViewStyle>;
}
export interface Option {
   label: string;
   value: string;
}

const SelectCustom = ({
   title,
   options,
   value,
   onValueChange,
   style,
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
      <TouchableOpacity
         style={[
            {
               width: "100%",
               borderRadius: 5,
               backgroundColor: Colors[colorScheme ?? "light"].inputContainer,
               borderColor: Colors[colorScheme ?? "light"].inputContainer,
               borderStyle: "solid",
               borderWidth: 2,
               elevation: 5,
            },
            focus && {
               borderColor: "#007bff",
            },
         ]}
      >
         <Picker
            style={{
               padding: 10,
               marginTop: 10,
               fontSize: 15,
               lineHeight: 17,
               color: Colors[colorScheme ?? "light"].inputText,
               fontFamily: "Poppins300",
               overflow: "hidden",

               // backgroundColor: "red",
            }}
            selectedValue={value}
            onValueChange={onValueChange}
            dropdownIconColor={Colors[colorScheme ?? "light"].inputTitle}
            onFocus={onFocus}
            onBlur={onBlur}
            mode="dropdown"
            itemStyle={{ marginTop: 10 }}
         >
            {options.map((option: Option, index: number) => {
               return (
                  <Picker.Item
                     style={{
                        backgroundColor:
                           Colors[colorScheme ?? "light"].inputContainer,
                        elevation: 3,

                        fontSize: 15,
                        color: Colors[colorScheme ?? "light"].inputText,
                        fontFamily: "Poppins300",
                        borderRadius: 3,
                     }}
                     label={option.label}
                     value={option.value}
                     key={index}
                  />
               );
            })}
         </Picker>
         <Text
            style={[
               {
                  position: "absolute",
                  top: 10,
                  left: 10,
                  zIndex: 1,
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
      </TouchableOpacity>
   );
};
export default SelectCustom;
