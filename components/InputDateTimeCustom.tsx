import {
   Text,
   ViewStyle,
   StyleProp,
   TouchableOpacity,
   useColorScheme,
   Platform,
   View,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatoFecha } from "../utils/funciones.util";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
   title: string;
   value: Date;
   onChange: Dispatch<SetStateAction<Date>>;
   style?: StyleProp<ViewStyle>;
   inputIsRequired?: boolean;
   inputIsEditable?: boolean;
}

const InputDateTimeCustom = ({
   title,
   value,
   onChange,
   style,
   inputIsRequired = false,
   inputIsEditable = true,
}: Props) => {
   const colorScheme = useColorScheme();

   const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
   const [focus, setfocus] = useState<boolean>(false);

   const onFocus = () => {
      setfocus(true);
   };
   const onBlur = () => {
      setfocus(false);
   };

   if (Platform.OS === "web") {
      return (
         <>
            <input
               style={{
                  paddingTop: 20,
                  paddingBottom: 10,
                  paddingRight: 10,
                  paddingLeft: 10,
                  display: "flex",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: Colors[colorScheme ?? "light"].inputBorder,
                  borderRadius: 5,
                  overflow: "hidden",
               }}
               type="date"
            />
            <label
               style={{
                  position: "absolute",
                  top: 3,
                  left: 20,
                  zIndex: 1,
                  fontSize: 11,
                  lineHeight: 13,
                  textAlign: "left",
                  color: Colors[colorScheme ?? "light"].inputTitle,
                  fontFamily: "Poppins500",
               }}
            >
               {title}
            </label>
         </>
      );
   } else {
      return (
         <View
            style={[
               {
                  width: "100%",
                  padding: 10,
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
               {`${title} ${inputIsRequired ? "*" : ""}`}
            </Text>
            <Text
               style={[
                  {
                     marginTop: 5,
                     fontSize: 15,
                     lineHeight: 17,
                     color: Colors[colorScheme ?? "light"].inputText,
                     fontFamily: "Poppins300",
                  },
               ]}
            >
               {formatoFecha(value.toString())}
            </Text>

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
               onPress={() => {
                  if (inputIsEditable) {
                     setShowDatePicker(true);
                     onFocus();
                  }
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

            {showDatePicker && (
               <DateTimePicker
                  mode="date"
                  value={value}
                  onChange={(event, selectedDate) => {
                     const currentDate = selectedDate || value;
                     setShowDatePicker(false);
                     onBlur();
                     onChange(currentDate);
                  }}
               />
            )}
         </View>
      );
   }
};

export default InputDateTimeCustom;
