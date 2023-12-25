import { Text, View, useColorScheme, Platform } from "react-native";
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

   return Platform.OS === "web" ? (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
         }}
      >
         <select
            disabled={!pickerIsEditable}
            style={{
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
               backgroundColor: !pickerIsEditable
                  ? colorScheme === "light"
                     ? "#00000020"
                     : "#ffffff40"
                  : Colors[colorScheme ?? "light"].inputContainer,
               borderStyle: "solid",
               borderWidth: 1,
               borderColor: focus
                  ? "#007bff"
                  : Colors[colorScheme ?? "light"].inputBorder,
               opacity: !pickerIsEditable ? 0.5 : 1,
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
            onChange={(e) => {
               if (pickerIsEditable) {
                  onChangeValue(e.target.value);
               }
            }}
         >
            {items.map((option: Option, index: number) => {
               return (
                  <option
                     key={index}
                     style={{
                        fontSize: 15,
                        fontFamily: "Poppins300",
                     }}
                     value={option.value}
                  >
                     {option.label}
                  </option>
               );
            })}
         </select>
         <div
            style={{
               display: "flex",
               top: 3,
               left: 10,
               position: "absolute",
               zIndex: 1,
            }}
         >
            <p
               style={{
                  display: "flex",
                  margin: 0,
                  padding: 0,
                  fontSize: 11,

                  color: focus
                     ? "#007bff"
                     : Colors[colorScheme ?? "light"].inputTitle,
                  fontFamily: "Poppins500",
               }}
            >
               {title}
            </p>
            {pickerIsRequired && (
               <p
                  style={{
                     display: "flex",
                     fontSize: 11,
                     margin: 0,
                     padding: 0,
                     color: focus ? "#007bff" : "#f44336",
                  }}
               >
                  {` *`}
               </p>
            )}
         </div>
      </div>
   ) : (
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
