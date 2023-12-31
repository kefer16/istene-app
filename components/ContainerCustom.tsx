import {
   ScrollView,
   Text,
   TouchableOpacity,
   View,
   useColorScheme,
} from "react-native";
import Colors from "../constants/Colors";
import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";

import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";

interface ContainerCustomProps {
   isVisible: boolean;
   title?: string;
   urlBack?: Href<"pathname" | string>;
   isSecondaryPage?: boolean;
   children: ReactNode;
}
const ContainerCustom = ({
   isVisible,
   title,
   urlBack,
   isSecondaryPage,
   children,
}: ContainerCustomProps) => {
   const colorScheme = useColorScheme();

   // const RutasSinScroll: string[] = ["/inicio/postulante"];
   return (
      <View
         style={[
            {
               flex: 1,
               backgroundColor: Colors[colorScheme ?? "light"].container,
            },
         ]}
      >
         {isVisible && (
            <LinearGradient
               colors={["#4622B0", "#381C8E", "#2A166D"]}
               start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 1 }}
               style={{
                  paddingTop: Constants.statusBarHeight,
                  backgroundColor:
                     Colors[colorScheme ?? "light"].containerHeader,
                  elevation: 5,
               }}
            >
               <View
                  style={{
                     width: "100%",
                     display: "flex",
                     flexDirection: "row",
                     alignSelf: "flex-end",
                     // backgroundColor: Colors[colorScheme ?? "light"].containerHeader,
                     paddingHorizontal: 10,
                     paddingVertical: 10,
                  }}
               >
                  {isSecondaryPage && (
                     <TouchableOpacity
                        style={{
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                           width: 30,
                           height: 30,
                           borderRadius: 50,
                           backgroundColor: "#0000003f",
                           marginRight: 20,
                        }}
                        // onPress={() => router.replace(urlBack ?? "..")}
                        onPress={() => router.back()}
                     >
                        <Ionicons
                           style={{
                              fontSize: 20,
                              color: "#fff",
                           }}
                           name={"arrow-back-outline"}
                        />
                     </TouchableOpacity>
                  )}

                  <Text
                     style={{
                        fontSize: 20,
                        color: "#fff",
                        fontFamily: "Poppins700",
                     }}
                  >
                     {title}
                  </Text>
               </View>
            </LinearGradient>
         )}

         <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
      </View>
   );
};

export default ContainerCustom;
