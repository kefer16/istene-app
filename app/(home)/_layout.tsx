import { Tabs } from "expo-router";
import { useColorScheme, View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";

export default function TabLayout() {
   const colorScheme = useColorScheme();

   useEffect(() => {}, []);

   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor:
               Colors[colorScheme ?? "light"].footerButtonHover,
            tabBarInactiveTintColor:
               Colors[colorScheme ?? "light"].footerButton,
            headerShown: false,
         }}
         initialRouteName="inicio"
      >
         <Tabs.Screen
            name="inicio"
            options={{
               title: "",
               tabBarIcon: ({ focused, color }) => (
                  <View style={styles.tabContainer}>
                     <Ionicons
                        style={styles.tabIcon}
                        name={focused ? "home" : "home-outline"}
                        color={color}
                     />
                     <Text style={[styles.tabText, { color: `${color}` }]}>
                        Inicio
                     </Text>
                  </View>
               ),
            }}
         />

         <Tabs.Screen
            name="reportes"
            options={{
               title: "",
               tabBarIcon: ({ focused, color }) => (
                  <View style={styles.tabContainer}>
                     <Ionicons
                        style={styles.tabIcon}
                        name={focused ? "stats-chart" : "stats-chart-outline"}
                        color={color}
                     />
                     <Text style={[styles.tabText, { color: `${color}` }]}>
                        Reportes
                     </Text>
                  </View>
               ),
            }}
         />
         <Tabs.Screen
            name="configuracion"
            options={{
               title: "",
               tabBarIcon: ({ focused, color }) => (
                  <View style={styles.tabContainer}>
                     <Ionicons
                        style={styles.tabIcon}
                        name={focused ? "settings" : "settings-outline"}
                        color={color}
                     />
                     <Text style={[styles.tabText, { color: `${color}` }]}>
                        Configuración
                     </Text>
                  </View>
               ),
            }}
         />
      </Tabs>
   );
}

const styles = StyleSheet.create({
   tabContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
   },
   tabIcon: {
      marginTop: 10,
      fontSize: 18,
   },
   tabText: {
      fontSize: 10,
      fontFamily: "Poppins400",
   },
});
