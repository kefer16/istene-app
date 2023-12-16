import { useContext, useState } from "react";
import {
   Text,
   TouchableOpacity,
   View,
   Alert,
   useColorScheme,
} from "react-native";
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

export default function RegistroScreen() {
   const { mostrarNotificacion } = useContext(IsteneSesionContext);
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
      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setCorreo("");
      setUsuario("");
      setContrasenia("");
      setRepetirContrasenia("");
   };
   const funCrearCuenta = () => {
      if (!dni) {
         Alert.alert("Ingrese un dni");
         return;
      }
      if (!nombre) {
         Alert.alert("Ingrese un nombre");
         return;
      }
      if (!apellidoPaterno) {
         Alert.alert("Ingrese un apellido paterno");
         return;
      }
      if (!apellidoMaterno) {
         Alert.alert("Ingrese un apellido materno");
         return;
      }
      if (!correo) {
         Alert.alert("Ingrese un correo");
         return;
      }

      if (!usuario) {
         Alert.alert("Ingrese un usuario");
         return;
      }

      if (!contrasenia) {
         Alert.alert("Ingrese una contraseña");
         return;
      }

      if (!repetirContrasenia) {
         Alert.alert("Repita su contraseña");
         return;
      }

      if (contrasenia !== repetirContrasenia) {
         Alert.alert("Las contraseñas deben ser iguales");
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

      srvUsuario
         .registrar(data)
         .then(() => {
            Alert.alert(
               "Exito",
               "se creó la cuenta correctamente, ahora Inicia Sesión"
            );
            funLimpiarFormulario();
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };

   const funObtenerNombresReniec = (dni: string) => {
      if (dni.length !== 8) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese los 8 dígitos, verifique DNI",
         });
         return;
      }
      const srvReniec = new ReniecService();
      srvReniec
         .obtenerNombres(dni)
         .then((resp) => {
            setNombre(resp.nombres);
            setApellidoPaterno(resp.apellidoPaterno);
            setApellidoMaterno(resp.apellidoMaterno);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };

   return (
      <ContainerCustom>
         <HeaderCustom title="Registro" isSecondaryPage={true} urlBack="/" />
         <View
            style={{
               flex: 1,
               padding: 20,
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
            />
            <InputTextCustom
               title="Nombre"
               placeholder="Ingrese nombre"
               value={nombre}
               functionChangeText={setNombre}
               keyboardType="default"
               maxLength={45}
            />
            <InputTextCustom
               title="Apellido"
               placeholder="Ingrese apellido paterno"
               value={apellidoPaterno}
               functionChangeText={setApellidoPaterno}
               keyboardType="default"
               maxLength={45}
            />
            <InputTextCustom
               title="Apellido"
               placeholder="Ingrese apellido materno"
               value={apellidoMaterno}
               functionChangeText={setApellidoMaterno}
               keyboardType="default"
               maxLength={45}
            />
            <InputTextCustom
               title="Correo"
               placeholder="Ingrese correo"
               value={correo}
               functionChangeText={setCorreo}
               keyboardType="default"
               maxLength={30}
            />
            <InputTextCustom
               title="Usuario"
               placeholder="Ingrese usuario"
               value={usuario}
               functionChangeText={setUsuario}
               keyboardType="default"
               maxLength={30}
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
      </ContainerCustom>
   );
}
