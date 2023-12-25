import { Text, View, useColorScheme } from "react-native";
import InputTextCustom from "../../../components/InputTextCustom";
import { useContext, useEffect, useState } from "react";
import Colors from "../../../constants/Colors";
import HeaderCustom from "../../../components/HeaderCustom";
import ContainerCustom from "../../../components/ContainerCustom";
import { IsteneSesionContext } from "../../../components/sesion/Sesion.component";
import ContainerWebCustom from "../../../components/ContainerWebCustom";
import { UsuarioService } from "../../../services/usuario.service";
import { formatoFecha } from "../../../utils/funciones.util";

const user = () => {
   const colorScheme = useColorScheme();
   const { isteneSesion, obtenerSesion, mostrarNotificacion, activarCarga } =
      useContext(IsteneSesionContext);

   const [fechaRegistro, setFechaRegistro] = useState<string>("");
   const [dni, setDni] = useState<string>("");
   const [nombre, setNombre] = useState<string>("");
   const [apellidoPaterno, setApellidoPaterno] = useState<string>("");
   const [apellidoMaterno, setApellidoMaterno] = useState<string>("");
   const [correo, setCorreo] = useState<string>("");
   const [usuario, setUsuario] = useState<string>("");

   const funUsuarioListarIndividual = async (id: string) => {
      const srvUsuario = new UsuarioService();
      await srvUsuario
         .listarIndividual(id)
         .then((resp) => {
            setUsuario(resp.usuario);
            setFechaRegistro(formatoFecha(resp.fecha_registro));
            setDni(resp.dni);
            setNombre(resp.nombre);
            setApellidoPaterno(resp.apellido_paterno);
            setApellidoMaterno(resp.apellido_materno);
            setCorreo(resp.correo);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };

   useEffect(() => {
      const obtenerData = async () => {
         activarCarga(true);
         obtenerSesion();
         await funUsuarioListarIndividual(isteneSesion.usuario_id);
         activarCarga(false);
      };
      obtenerData();
   }, []);

   return (
      <ContainerCustom>
         <HeaderCustom
            title="Perfil"
            isSecondaryPage={true}
            urlBack={"/(home)/configuracion"}
         />
         <ContainerWebCustom>
            <View
               style={{
                  marginVertical: 20,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
               }}
            >
               <Text
                  style={{
                     marginTop: 10,
                     fontFamily: "Poppins700",
                     fontSize: 20,
                     lineHeight: 22,
                     color: Colors[colorScheme ?? "light"].textTitle,
                  }}
               >
                  {usuario}
               </Text>
            </View>

            <View
               style={{
                  flex: 1,
                  padding: 10,
                  backgroundColor: Colors[colorScheme ?? "light"].container,
                  gap: 10,
               }}
            >
               <View
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
               >
                  <InputTextCustom
                     title="Fecha Registro"
                     placeholder=""
                     value={fechaRegistro}
                     functionChangeText={setFechaRegistro}
                     keyboardType="default"
                     inputIsRequired={true}
                     inputIsEditable={false}
                  />
                  <InputTextCustom
                     title="DNI"
                     placeholder="Ingrese DNI"
                     value={dni}
                     functionChangeText={setDni}
                     keyboardType="number-pad"
                     maxLength={8}
                     inputIsRequired={true}
                     inputIsEditable={false}
                  />
                  <InputTextCustom
                     title="Nombre"
                     placeholder="Ingrese nombre"
                     value={nombre}
                     functionChangeText={setNombre}
                     keyboardType="default"
                     maxLength={45}
                     inputIsRequired={true}
                     inputIsEditable={false}
                  />
                  <InputTextCustom
                     title="Apellido Paterno"
                     placeholder="Ingrese apellido paterno"
                     value={apellidoPaterno}
                     functionChangeText={setApellidoPaterno}
                     keyboardType="default"
                     maxLength={45}
                     inputIsRequired={true}
                     inputIsEditable={false}
                  />
                  <InputTextCustom
                     title="Apellido Materno"
                     placeholder="Ingrese apellido materno"
                     value={apellidoMaterno}
                     functionChangeText={setApellidoMaterno}
                     keyboardType="default"
                     maxLength={45}
                     inputIsRequired={true}
                     inputIsEditable={false}
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
                     inputIsEditable={false}
                  />
                  {/* <InputTextCustom
                     title="Teléfono"
                     keyboardType="phone-pad"
                     value={telefono}
                     functionChangeText={setTelefono}
                     maxLength={45}
                     placeholder="Ingrese teléfono"
                     inputIsEditable={false}
                  />

                  <InputTextCustom
                     title="Direccion"
                     keyboardType="default"
                     value={direccion}
                     functionChangeText={setDireccion}
                     maxLength={45}
                     placeholder="Ingrese dirección"
                     inputIsEditable={false}
                  /> */}
               </View>
               {/* <ButtonCustom
                  text="Actualizar"
                  onPress={funActualizarPerfil}
                  isEnabled={false}
               /> */}
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
};

export default user;
