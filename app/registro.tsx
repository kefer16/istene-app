import { useContext, useState } from "react";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";
import InputTextCustom from "../components/InputTextCustom";
import InputPasswordCustom from "../components/InputPasswordCustom";
import { Link } from "expo-router";
import { UsuarioService } from "../services/usuario.service";
import { UsuarioEntity } from "../entities/usuario.entity";
import { crearFechaISO } from "../utils/funciones.util";
import ContainerCustom from "../components/ContainerCustom";
import Colors from "../constants/Colors";
import HeaderCustom from "../components/HeaderCustom";
import InputTextSearchCustom from "../components/InputTextSearchCustom";
import { ReniecService } from "../services/reniec.service";
import { IsteneSesionContext } from "../components/sesion/Sesion.component";
import ContainerWebCustom from "../components/ContainerWebCustom";

export default function RegistroScreen() {
   const { mostrarNotificacion, activarCarga } =
      useContext(IsteneSesionContext);
   const colorScheme = useColorScheme();
   const [dni, setDni] = useState<string>("");
   const [nombre, setNombre] = useState<string>("");
   const [apellidoPaterno, setApellidoPaterno] = useState<string>("");
   const [apellidoMaterno, setApellidoMaterno] = useState<string>("");
   const [correo, setCorreo] = useState<string>("");
   const [usuario, setUsuario] = useState<string>("");
   const [contrasenia, setContrasenia] = useState<string>("");
   const [esconderContrasenia, setEsconderContrasenia] =
      useState<boolean>(true);
   const [repetirContrasenia, setRepetirContrasenia] = useState<string>("");
   const [esconderRepetirContrasenia, setEsconderRepetirContrasenia] =
      useState<boolean>(true);

   const funLimpiarFormulario = () => {
      setDni("");
      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setCorreo("");
      setUsuario("");
      setContrasenia("");
      setRepetirContrasenia("");
   };
   const funCrearCuenta = async () => {
      if (!dni) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese un dni" });
         return;
      }
      if (!nombre) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese un nombre" });
         return;
      }
      if (!apellidoPaterno) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese un apellido paterno",
         });
         return;
      }
      if (!apellidoMaterno) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese un apellido materno",
         });
         return;
      }
      if (!correo) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese un correo" });
         return;
      }

      if (!usuario) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese un usuario" });
         return;
      }

      if (!contrasenia) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese una contraseña",
         });
         return;
      }

      if (!repetirContrasenia) {
         mostrarNotificacion({ tipo: "warn", detalle: "Repita su contraseña" });
         return;
      }

      if (contrasenia !== repetirContrasenia) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Las contraseñas deben ser iguales",
         });
         return;
      }

      const data: UsuarioEntity = new UsuarioEntity(
         "",
         dni,
         nombre,
         apellidoPaterno,
         apellidoMaterno,
         correo,
         usuario,
         contrasenia,
         "",
         crearFechaISO(),
         "",
         "",
         true,
         "763EE9D5-7BD0-401D-BA4A-4D126B5E396C"
      );
      const srvUsuario = new UsuarioService();

      activarCarga(true);
      await srvUsuario
         .registrarIndividual(data)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               detalle: "Se creó la cuenta correctamente, ahora Inicia Sesión",
            });
            funLimpiarFormulario();
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   const funObtenerNombresReniec = async (dni: string) => {
      if (dni.length !== 8) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese los 8 dígitos, verifique DNI",
         });
         return;
      }
      const srvReniec = new ReniecService();
      activarCarga(true);
      await srvReniec
         .obtenerNombres(dni)
         .then((resp) => {
            setNombre(resp.nombres);
            setApellidoPaterno(resp.apellidoPaterno);
            setApellidoMaterno(resp.apellidoMaterno);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   return (
      <ContainerCustom>
         <HeaderCustom title="Registro" isSecondaryPage={true} urlBack="/" />
         <ContainerWebCustom>
            <View
               style={{
                  flex: 1,
                  padding: 10,
                  gap: 10,
                  backgroundColor: Colors[colorScheme ?? "light"].container,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
               }}
            >
               <Text
                  style={{
                     marginTop: 20,
                     fontSize: 30,
                     lineHeight: 32,
                     color: Colors[colorScheme ?? "light"].textTitle,
                     textAlign: "center",
                     fontFamily: "Poppins900",
                  }}
               >
                  Crea una cuenta
               </Text>
               <Text
                  style={{
                     fontSize: 20,
                     lineHeight: 22,
                     color: Colors[colorScheme ?? "light"].textSubtitle,
                     textAlign: "center",
                     fontFamily: "Poppins400",
                     marginBottom: 20,
                  }}
               >
                  para comenzar ahora!
               </Text>

               <InputTextSearchCustom
                  title="DNI"
                  placeholder="Ingrese DNI"
                  value={dni}
                  functionChangeText={setDni}
                  funButtonSearch={() => funObtenerNombresReniec(dni)}
                  keyboardType="number-pad"
                  maxLength={8}
                  inputIsRequired={true}
               />
               <InputTextCustom
                  title="Nombre"
                  placeholder="Ingrese nombre"
                  value={nombre}
                  functionChangeText={setNombre}
                  keyboardType="default"
                  maxLength={45}
                  inputIsRequired={true}
               />
               <InputTextCustom
                  title="Apellido Paterno"
                  placeholder="Ingrese apellido paterno"
                  value={apellidoPaterno}
                  functionChangeText={setApellidoPaterno}
                  keyboardType="default"
                  maxLength={45}
                  inputIsRequired={true}
               />
               <InputTextCustom
                  title="Apellido Materno"
                  placeholder="Ingrese apellido materno"
                  value={apellidoMaterno}
                  functionChangeText={setApellidoMaterno}
                  keyboardType="default"
                  maxLength={45}
                  inputIsRequired={true}
               />
               <InputTextCustom
                  styleInput={{ textTransform: "lowercase" }}
                  title="Correo"
                  placeholder="Ingrese correo"
                  value={correo}
                  functionChangeText={setCorreo}
                  keyboardType="default"
                  maxLength={30}
                  inputIsRequired={true}
               />
               <InputTextCustom
                  styleInput={{ textTransform: "lowercase" }}
                  title="Usuario"
                  placeholder="Ingrese usuario"
                  value={usuario}
                  functionChangeText={setUsuario}
                  keyboardType="default"
                  maxLength={30}
                  inputIsRequired={true}
               />
               <InputPasswordCustom
                  title="Contraseña"
                  placeholder="Ingrese contraseña"
                  value={contrasenia}
                  functionChangeText={setContrasenia}
                  activePassword={esconderContrasenia}
                  functionActivePassword={() =>
                     setEsconderContrasenia(!esconderContrasenia)
                  }
                  inputIsRequired={true}
               />
               <InputPasswordCustom
                  title="Repetir Contraseña"
                  placeholder="Ingrese otra vez la contraseña"
                  value={repetirContrasenia}
                  functionChangeText={setRepetirContrasenia}
                  activePassword={esconderRepetirContrasenia}
                  functionActivePassword={() =>
                     setEsconderRepetirContrasenia(!esconderRepetirContrasenia)
                  }
                  inputIsRequired={true}
               />

               <TouchableOpacity
                  style={{
                     marginTop: 10,
                     width: "100%",
                     paddingVertical: 15,
                     borderRadius: 10,
                     backgroundColor:
                        Colors[colorScheme ?? "light"].buttonContainer,
                  }}
                  onPress={funCrearCuenta}
               >
                  <Text
                     style={{
                        textAlign: "center",
                        color: Colors[colorScheme ?? "light"].buttonText,
                        fontSize: 16,
                        fontFamily: "Poppins600",
                     }}
                  >
                     Crea cuenta
                  </Text>
               </TouchableOpacity>
               <View
                  style={{
                     width: "100%",
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "center",
                     marginVertical: 20,
                  }}
               >
                  <Text
                     style={{
                        color: Colors[colorScheme ?? "light"].text,
                        fontSize: 13,
                        fontFamily: "Poppins400",
                     }}
                  >
                     Ya tienes una cuenta?
                  </Text>
                  <Link
                     href={"/"}
                     style={{
                        color: Colors[colorScheme ?? "light"].text,
                        marginLeft: 10,
                        fontSize: 13,
                        fontFamily: "Poppins400",
                        textDecorationLine: "underline",
                     }}
                  >
                     <Text>Inicia Sesión</Text>
                  </Link>
               </View>
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
}
