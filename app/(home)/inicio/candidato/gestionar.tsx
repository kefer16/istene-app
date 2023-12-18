import React, { useContext, useEffect, useState } from "react";
import ContainerCustom from "../../../../components/ContainerCustom";
import HeaderCustom from "../../../../components/HeaderCustom";
import InputTextSearchCustom from "../../../../components/InputTextSearchCustom";
import { ReniecService } from "../../../../services/reniec.service";
import { IsteneSesionContext } from "../../../../components/sesion/Sesion.component";
import InputTextCustom from "../../../../components/InputTextCustom";
import { View, useColorScheme } from "react-native";
import Colors from "../../../../constants/Colors";
import TitleCustom from "../../../../components/TitleCustom";
import InputDateTimeCustom from "../../../../components/InputDateTimeCustom";
import SelectCustom from "../../../../components/SelectCustom";
import { CandidatoService } from "../../../../services/candidato.service";
import { CandidatoEntity } from "../../../../entities/candidato.entity";
import { fechaActualISO } from "../../../../utils/funciones.util";
import { useLocalSearchParams } from "expo-router";
import ButtonIconCustom from "../../../../components/ButtonIconCustom";
import {
   OpcionGestion,
   OpcionesGestionPros,
   funValidarOpcionGestion,
} from "../../../../constants/OpcionGestion";
import ButtonCrudCustom from "../../../../components/ButtonCrudCustom";

const gestionar = () => {
   const { obtenerSesion, isteneSesion, mostrarNotificacion } =
      useContext(IsteneSesionContext);
   const colorScheme = useColorScheme();

   const { url_candidato_id, url_opcion_gestion } = useLocalSearchParams<{
      url_candidato_id: string;
      url_opcion_gestion: string;
   }>();

   // const [esEdicion, setEsEdicion] = useState<boolean>(false);
   const [opcionGestion, setOpcionGestion] = useState<OpcionesGestionPros>(
      {} as OpcionesGestionPros
   );
   const [fechaRegistro, setFechaRegistro] = useState<Date>(new Date());
   const [estado, setEstado] = useState<string>("");
   const [candidatoId, setCandidatoId] = useState<string>("");
   const [dni, setDni] = useState<string>("");
   const [nombre, setNombre] = useState<string>("");
   const [apellidoPaterno, setApellidoPaterno] = useState<string>("");
   const [apellidoMaterno, setApellidoMaterno] = useState<string>("");
   const [telefono, setTelefono] = useState<string>("");
   const [direccion, setDireccion] = useState<string>("");
   const [observacion, setObservacion] = useState<string>("");

   const funCandidatoListarIndividual = async (id: string) => {
      if (id === "") {
         return;
      }
      const srvCandidato = new CandidatoService();

      await srvCandidato
         .listarIndividual(id)
         .then((resp) => {
            setDni(resp.dni);
            setNombre(resp.nombre);
            setApellidoPaterno(resp.apellido_paterno);
            setApellidoMaterno(resp.apellido_materno);
            setTelefono(resp.telefono);
            setDireccion(resp.direccion);
            setObservacion(resp.observacion);
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "warn",
               detalle: error.message,
            });
         });
   };
   useEffect(() => {
      obtenerSesion();
      const srvCandidato = new CandidatoService();
      setCandidatoId(srvCandidato.obtenerIdDeURL(url_candidato_id));
      setOpcionGestion(funValidarOpcionGestion(url_opcion_gestion));
      funCandidatoListarIndividual(
         srvCandidato.obtenerIdDeURL(url_candidato_id)
      );
   }, []);

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

   const funValidarCamposCorrectos = (): boolean => {
      if (!dni) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese DNI" });
         return false;
      }
      if (!nombre) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese nombre" });
         return false;
      }
      if (!apellidoPaterno) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese apellido paterno",
         });
         return false;
      }
      if (!apellidoMaterno) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese apellido materno",
         });
         return false;
      }
      if (!telefono) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese telefono" });
         return false;
      }
      if (!direccion) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese direccion" });
         return false;
      }

      return true;
   };

   const funCandidatoRegistarIndividual = async () => {
      const srvCandidato = new CandidatoService();

      if (!funValidarCamposCorrectos()) {
         return;
      }

      const data: CandidatoEntity = {
         candidato_id: "",
         dni: dni,
         nombre: nombre,
         apellido_paterno: apellidoPaterno,
         apellido_materno: apellidoMaterno,
         direccion: direccion,
         telefono: telefono,
         observacion: observacion,
         activo: true,
         fecha_registro: fechaActualISO(),
         fk_operador: "9B4E23F3-FE7B-4B6C-B2F9-6886B10C2AEC",
         fk_usuario: isteneSesion.usuario_id,
      };
      srvCandidato
         .registrarIndividual(data)
         .then(() => {
            setOpcionGestion(funValidarOpcionGestion("0"));
            mostrarNotificacion({
               tipo: "success",
               detalle: "Candidato registrado exitosamente",
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };

   const funCandidatoActualizarIndividual = async (id: string) => {
      const srvCandidato = new CandidatoService();

      if (!funValidarCamposCorrectos()) {
         return;
      }

      const data: CandidatoEntity = {
         candidato_id: "",
         dni: dni,
         nombre: nombre,
         apellido_paterno: apellidoPaterno,
         apellido_materno: apellidoMaterno,
         direccion: direccion,
         telefono: telefono,
         observacion: observacion,
         activo: true,
         fecha_registro: fechaActualISO(),
         fk_operador: "9B4E23F3-FE7B-4B6C-B2F9-6886B10C2AEC",
         fk_usuario: isteneSesion.usuario_id,
      };
      srvCandidato
         .actualizarIndividual(id, data)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               detalle: "Candidato actualizado exitosamente",
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };

   return (
      <ContainerCustom>
         <HeaderCustom
            title="Candidato / Gestionar"
            isSecondaryPage={true}
            urlBack={"/(home)/inicio/candidato/"}
         />
         <View
            style={{
               flex: 1,
               padding: 10,
               gap: 10,
               backgroundColor: Colors[colorScheme ?? "light"].container,
            }}
         >
            <View
               style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
               }}
            >
               <TitleCustom
                  textStyle={{
                     backgroundColor: opcionGestion.color,
                     padding: 10,
                     borderRadius: 5,
                  }}
                  text={`Modo ${opcionGestion.nombre}`}
                  textSize={15}
               />

               {opcionGestion.habilitarBotones && (
                  <View
                     style={{
                        gap: 5,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                     }}
                  >
                     <ButtonIconCustom
                        iconName={
                           opcionGestion.tipo === OpcionGestion.EDITAR
                              ? "close"
                              : "create"
                        }
                        iconColor="#F6A626"
                        onPress={() => {
                           opcionGestion.tipo === OpcionGestion.EDITAR
                              ? setOpcionGestion(funValidarOpcionGestion("0"))
                              : setOpcionGestion(funValidarOpcionGestion("2"));
                        }}
                     />
                     <ButtonIconCustom
                        iconName={"trash"}
                        iconColor="#f44336"
                        onPress={() => {}}
                     />
                     <ButtonIconCustom
                        iconName={"call"}
                        iconColor="#00bcd4"
                        onPress={() => {}}
                     />
                  </View>
               )}
            </View>

            <InputDateTimeCustom
               title="Fecha Registro"
               value={fechaRegistro}
               onChange={setFechaRegistro}
            />
            <SelectCustom
               title="Selecciona Estado"
               value={estado}
               onValueChange={setEstado}
               options={[
                  { label: "opcion1", value: "1" },
                  { label: "opcion2", value: "2" },
               ]}
            />
            <InputTextSearchCustom
               title="DNI"
               placeholder="Ingrese DNI"
               value={dni}
               functionChangeText={setDni}
               funButtonSearch={() => funObtenerNombresReniec(dni)}
               keyboardType="number-pad"
               maxLength={8}
               inputIsEditable={opcionGestion.esEditable}
               inputIsRequired={true}
            />
            <InputTextCustom
               title="Nombre"
               placeholder="Ingrese nombre"
               value={nombre}
               functionChangeText={setNombre}
               keyboardType="default"
               maxLength={45}
               inputIsEditable={opcionGestion.esEditable}
               inputIsRequired={true}
            />
            <InputTextCustom
               title="Apellido Paterno"
               placeholder="Ingrese apellido paterno"
               value={apellidoPaterno}
               functionChangeText={setApellidoPaterno}
               keyboardType="default"
               maxLength={45}
               inputIsEditable={opcionGestion.esEditable}
               inputIsRequired={true}
            />
            <InputTextCustom
               title="Apellido Materno"
               placeholder="Ingrese apellido materno"
               value={apellidoMaterno}
               functionChangeText={setApellidoMaterno}
               keyboardType="default"
               maxLength={45}
               inputIsEditable={opcionGestion.esEditable}
               inputIsRequired={true}
            />
            <InputTextCustom
               title="Teléfono"
               placeholder="Ingrese teléfono"
               value={telefono}
               functionChangeText={setTelefono}
               keyboardType="phone-pad"
               maxLength={9}
               inputIsEditable={opcionGestion.esEditable}
               inputIsRequired={true}
            />
            <InputTextCustom
               title="Dirección"
               placeholder="Ingrese dirección"
               value={direccion}
               functionChangeText={setDireccion}
               keyboardType="default"
               maxLength={300}
               inputIsEditable={opcionGestion.esEditable}
               inputIsRequired={true}
            />
            <InputTextCustom
               title="Observación"
               placeholder="Ingrese observación"
               value={observacion}
               functionChangeText={setObservacion}
               keyboardType="default"
               maxLength={500}
               inputIsEditable={opcionGestion.esEditable}
            />
            <ButtonCrudCustom
               isEnabled={opcionGestion.esEditable}
               buttonBackgroundColor={opcionGestion.color}
               text={
                  opcionGestion.tipo === OpcionGestion.REGISTRAR
                     ? "Registar"
                     : "Actualizar"
               }
               onPress={() => {
                  opcionGestion.tipo === OpcionGestion.REGISTRAR
                     ? funCandidatoRegistarIndividual()
                     : funCandidatoActualizarIndividual(candidatoId);
               }}
            />
         </View>
      </ContainerCustom>
   );
};

export default gestionar;
