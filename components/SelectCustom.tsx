import { Text, View, useColorScheme } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Colors from "../constants/Colors";

interface Props {
   title: string;
   items: Option[];
   value: string; // Valor opcional, puede ser undefined
   onChangeValue: Dispatch<SetStateAction<string>>;
   pickerIsEditable?: boolean;
   pickerIsRequired?: boolean;
}
export interface Option {
   label: string;
   value: string;
}

const SelectCustom = ({
   title,
   items,
   value,
   pickerIsEditable = true,
   pickerIsRequired = false,
   onChangeValue,
}: Props) => {
   const colorScheme = useColorScheme();
   const [focus, setFocus] = useState<boolean>(false);
   const onFocus = () => {
      setFocus(true);
   };
   const onBlur = () => {
      setFocus(false);
   };
   return (
      <View
         style={[
            {
               overflow: "hidden",
               borderRadius: 5,
               borderStyle: "solid",
               borderWidth: 1,
               borderColor: Colors[colorScheme ?? "light"].inputBorder,
               paddingTop: 10,
               backgroundColor: Colors[colorScheme ?? "light"].inputContainer,
            },
            focus && {
               borderColor: "#007bff",
            },
            !pickerIsEditable && {
               opacity: 0.5,
               backgroundColor:
                  colorScheme === "light" ? "#00000020" : "#ffffff40",
            },
         ]}
      >
         <Picker
            enabled={pickerIsEditable}
            selectionColor={Colors[colorScheme ?? "light"].inputContainer}
            style={[
               {
                  fontSize: 15,
                  color: Colors[colorScheme ?? "light"].inputText,
                  fontFamily: "Poppins300",
               },
            ]}
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) => {
               if (pickerIsEditable) {
                  onChangeValue(itemValue);
               }
            }}
            dropdownIconColor={Colors[colorScheme ?? "light"].inputTitle}
            mode="dialog"
            onFocus={onFocus}
            onBlur={onBlur}
         >
            {items.map((option: Option, index: number) => {
               return (
                  <Picker.Item
                     style={{
                        fontSize: 15,
                        fontFamily: "Poppins300",
                        overflow: "hidden",
                     }}
                     label={option.label}
                     value={option.value}
                     key={index}
                  />
               );
            })}
         </Picker>
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
            {pickerIsRequired && (
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
      </View>
   );
};
export default SelectCustom;
