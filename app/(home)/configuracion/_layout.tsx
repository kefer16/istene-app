import { Stack } from "expo-router";

const _layout = () => {
   return (
      <Stack>
         <Stack.Screen name="index" options={{ headerShown: false }} />
         <Stack.Screen name="perfil" options={{ headerShown: false }} />
         <Stack.Screen
            name="cambiar_contrasenia"
            options={{ headerShown: false }}
         />
      </Stack>
   );
};

export default _layout;
