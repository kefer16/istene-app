import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
   return (
      <Stack>
         <Stack.Screen name="index" options={{ headerShown: false }} />
         <Stack.Screen name="candidato" options={{ headerShown: false }} />
         <Stack.Screen name="carrera" options={{ headerShown: false }} />
         <Stack.Screen name="exportar" options={{ headerShown: false }} />
      </Stack>
   );
};

export default _layout;
