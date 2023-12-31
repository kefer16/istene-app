import { StyleProp, Text, View, ViewStyle, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

interface Props {
   text: string;
   onPress: () => void;
   styleButton?: StyleProp<ViewStyle>;
   isEnabled?: boolean;
}
const ButtonCustom = ({
   styleButton,
   text,
   onPress,
   isEnabled = true,
}: Props) => {
   const colorScheme = useColorScheme();
   return (
      <TouchableOpacity
         onPress={() => {
            isEnabled && onPress();
         }}
      >
         <View
            style={[
               {
                  width: "100%",
                  paddingVertical: 15,
                  borderRadius: 10,
                  backgroundColor:
                     Colors[colorScheme ?? "light"].buttonContainer,
               },
               !isEnabled && {
                  opacity: 0.6,
               },
            ]}
         >
            <Text
               style={{
                  textAlign: "center",
                  color: Colors[colorScheme ?? "light"].buttonText,
                  fontSize: 16,
                  fontFamily: "Poppins600",
               }}
            >
               {text}
            </Text>
         </View>
      </TouchableOpacity>
   );
};

export default ButtonCustom;
