import {
   Text,
   ViewStyle,
   StyleProp,
   TouchableOpacity,
   useColorScheme,
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
}

const InputDateTimeCustom = ({ title, value, onChange, style }: Props) => {
   const colorScheme = useColorScheme();

   const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
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
         onPress={() => {
            setShowDatePicker(true);
            onFocus();
         }}
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
            onPress={() => setShowDatePicker(true)}
         >
            <Ionicons
               style={{ color: Colors[colorScheme ?? "light"].inputTitle }}
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
      </TouchableOpacity>
   );
};

export default InputDateTimeCustom;
