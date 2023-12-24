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
import SelectCustom, { Option } from "../../../../components/SelectCustom";

import { fechaActualISO, formatoFecha } from "../../../../utils/funciones.util";
import { router, useLocalSearchParams } from "expo-router";
import ButtonIconCustom from "../../../../components/ButtonIconCustom";
import {
   OpcionGestion,
   OpcionesGestionPros,
   funValidarOpcionGestion,
} from "../../../../constants/OpcionGestion";
import ButtonCrudCustom from "../../../../components/ButtonCrudCustom";
import ContainerWebCustom from "../../../../components/ContainerWebCustom";
import { PostulanteEstadoService } from "../../../../services/postulante_estado.service";
import { CarreraService } from "../../../../services/carrera.service";
import {
   PostulanteActualizarRequest,
   PostulanteCarreraRequest,
   PostulanteHistorialRequest,
   PostulanteRequest,
} from "../../../../interfaces/resquests/postulante.request";
import { OperadorService } from "../../../../services/operador.service";
import { PostulanteListarIndividualResponse } from "../../../../interfaces/responses/postulante.response";
import ModoVisualizacionCustom from "../../../../components/ModoVisualizacionCustom";
import * as Contacts from "expo-contacts";
import { PostulanteService } from "../../../../services/postulante.service";

const gestionar = () => {
   const { obtenerSesion, isteneSesion, mostrarNotificacion, activarCarga } =
      useContext(IsteneSesionContext);
   const colorScheme = useColorScheme();

   const { url_postulante_id, url_opcion_gestion } = useLocalSearchParams<{
      url_postulante_id: string;
      url_opcion_gestion: string;
   }>();

   // const [esEdicion, setEsEdicion] = useState<boolean>(false);
   const [opcionGestion, setOpcionGestion] = useState<OpcionesGestionPros>(
      {} as OpcionesGestionPros
   );
   const [fechaRegistro, setFechaRegistro] = useState<string>(fechaActualISO());
   const [fechaActualizacion, setFechaActualizacion] = useState<string>(
      fechaActualISO()
   );
   const [postulanteId, setPostulanteId] = useState<string>("");
   const [dni, setDni] = useState<string>("");
   const [nombre, setNombre] = useState<string>("");
   const [apellidoPaterno, setApellidoPaterno] = useState<string>("");
   const [apellidoMaterno, setApellidoMaterno] = useState<string>("");
   const [telefono, setTelefono] = useState<string>("");
   const [direccion, setDireccion] = useState<string>("");
   const [observacion, setObservacion] = useState<string>("");
   const [usuarioRegistro, setUsuarioRegistro] = useState<string>("");
   const [usuarioActualizacion, setUsuarioActualizacion] = useState<string>("");
   const [arrayPostulanteEstado, setArrayPostulanteEstado] = useState<Option[]>(
      []
   );
   const [fkPostulanteEstado, setFkPostulanteEstado] = useState<string>("0");

   const [arrayCarrera, setArrayCarrera] = useState<Option[]>([]);
   const [arrayOperador, setArrayOperador] = useState<Option[]>([]);
   const [fkOperador, setFkOperador] = useState<string>("0");
   const [carreraOpcionUno, setCarreraOpcionUno] = useState<string>("0");
   const [carreraOpcionDos, setCarreraOpcionDos] = useState<string>("0");
   const [carreraOpcionTres, setCarreraOpcionTres] = useState<string>("0");

   const funLlenarComboOperador = async () => {
      const srvOperador = new OperadorService();

      await srvOperador
         .llenarCombo()
         .then((resp) => {
            setArrayOperador(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "warn", detalle: error.message });
         });
   };

   const funLlenarComboPostulanteEstado = async () => {
      const srvCandEstado = new PostulanteEstadoService();

      await srvCandEstado
         .llenarCombo()
         .then((resp) => {
            setArrayPostulanteEstado(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "warn", detalle: error.message });
         });
   };

   const funLlenarComboCarrera = async () => {
      const srvCarrera = new CarreraService();

      await srvCarrera
         .llenarCombo()
         .then((resp) => {
            setArrayCarrera(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "warn", detalle: error.message });
         });
   };
   const funPostulanteListarIndividual = async (id: string) => {
      if (id === "") {
         setUsuarioRegistro(isteneSesion.usuario);
         return;
      }
      const srvPostulante = new PostulanteService();

      await srvPostulante
         .listarIndividual(id)
         .then((resp: PostulanteListarIndividualResponse) => {
            setFechaRegistro(resp.fecha_registro);
            setUsuarioRegistro(resp.cls_usuario.usuario);
            setFechaActualizacion(resp.fecha_actualizacion);
            setUsuarioActualizacion(
               resp.lst_postulante_historial[0].cls_usuario.usuario
            );
            setFkPostulanteEstado(resp.fk_postulante_estado);
            setDni(resp.dni);
            setNombre(resp.nombre);
            setApellidoPaterno(resp.apellido_paterno);
            setApellidoMaterno(resp.apellido_materno);
            setFkOperador(resp.fk_operador);
            setTelefono(resp.telefono);
            setDireccion(resp.direccion);
            setObservacion(resp.observacion);
            setCarreraOpcionUno(
               resp.lst_postulante_carrera.find(
                  (item) => item.numero_opcion === 1
               )?.fk_carrera ?? "0"
            );
            setCarreraOpcionDos(
               resp.lst_postulante_carrera.find(
                  (item) => item.numero_opcion === 2
               )?.fk_carrera ?? "0"
            );
            setCarreraOpcionTres(
               resp.lst_postulante_carrera.find(
                  (item) => item.numero_opcion === 3
               )?.fk_carrera ?? "0"
            );

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
      const obtenerDatos = async () => {
         activarCarga(true);
         obtenerSesion();
         const srvPostulante = new PostulanteService();
         setPostulanteId(srvPostulante.obtenerIdDeURL(url_postulante_id));
         setOpcionGestion(funValidarOpcionGestion(url_opcion_gestion));
         await funLlenarComboPostulanteEstado();
         await funLlenarComboOperador();
         await funLlenarComboCarrera();
         await funPostulanteListarIndividual(
            srvPostulante.obtenerIdDeURL(url_postulante_id)
         );
         activarCarga(false);
      };
      obtenerDatos();
   }, []);

   const funObtenerNombresReniec = async (dni: string) => {
      if (dni.length !== 8) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese los 8 dígitos, verifique DNI",
         });
         return;
      }
      activarCarga(true);
      const srvReniec = new ReniecService();
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

   const funValidarCamposCorrectos = (): boolean => {
      if (fkPostulanteEstado === "0") {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Seleccione el estado del postulante",
         });
         return false;
      }
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
      if (fkOperador === "0") {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Seleccione un operador",
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

      if (carreraOpcionUno === "0") {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Seleccione por lo menos una carrera",
         });
         return false;
      }

      return true;
   };

   const funPostulanteRegistarIndividual = async () => {
      const srvPostulante = new PostulanteService();

      if (!funValidarCamposCorrectos()) {
         return;
      }

      const arrayCandCarrera: PostulanteCarreraRequest[] = [];

      if (carreraOpcionUno !== "0") {
         arrayCandCarrera.push({
            numero_opcion: 1,
            activo: true,
            fk_postulante: "",
            fk_carrera: carreraOpcionUno,
         });
      }

      if (carreraOpcionDos !== "0") {
         arrayCandCarrera.push({
            numero_opcion: 2,
            activo: true,
            fk_postulante: "",
            fk_carrera: carreraOpcionDos,
         });
      }

      if (carreraOpcionTres !== "0") {
         arrayCandCarrera.push({
            numero_opcion: 3,
            activo: true,
            fk_postulante: "",
            fk_carrera: carreraOpcionTres,
         });
      }
      const fecha_registro = fechaActualISO();
      const dataHistorial: PostulanteHistorialRequest = {
         fecha_registro: fecha_registro,
         fk_postulante: "",
         fk_usuario: isteneSesion.usuario_id,
      };

      const data: PostulanteRequest = {
         dni: dni,
         nombre: nombre,
         apellido_paterno: apellidoPaterno,
         apellido_materno: apellidoMaterno,
         direccion: direccion,
         telefono: telefono,
         observacion: observacion,
         activo: true,
         fecha_registro: fecha_registro,
         fecha_actualizacion: fecha_registro,
         fk_operador: fkOperador,
         fk_usuario: isteneSesion.usuario_id,
         fk_postulante_estado: fkPostulanteEstado,
         lst_postulante_carrera: arrayCandCarrera,
         cls_postulante_historial: dataHistorial,
      };

      activarCarga(true);
      await srvPostulante
         .registrarIndividual(data)
         .then(() => {
            setOpcionGestion(funValidarOpcionGestion("0"));
            mostrarNotificacion({
               tipo: "success",
               detalle: "Postulante registrado exitosamente",
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });

      activarCarga(false);
      router.replace("/(home)/inicio/postulante/");
   };

   const funPostulanteActualizarIndividual = async (id: string) => {
      const srvPostulante = new PostulanteService();

      if (!funValidarCamposCorrectos()) {
         return;
      }

      const arrayCandCarrera: PostulanteCarreraRequest[] = [];

      if (carreraOpcionUno !== "0") {
         arrayCandCarrera.push({
            numero_opcion: 1,
            activo: true,
            fk_postulante: "",
            fk_carrera: carreraOpcionUno,
         });
      }

      if (carreraOpcionDos !== "0") {
         arrayCandCarrera.push({
            numero_opcion: 2,
            activo: true,
            fk_postulante: "",
            fk_carrera: carreraOpcionDos,
         });
      }

      if (carreraOpcionTres !== "0") {
         arrayCandCarrera.push({
            numero_opcion: 3,
            activo: true,
            fk_postulante: "",
            fk_carrera: carreraOpcionTres,
         });
      }
      const fecha_registro = fechaActualISO();
      const dataHistorial: PostulanteHistorialRequest = {
         fecha_registro: fecha_registro,
         fk_postulante: "",
         fk_usuario: isteneSesion.usuario_id,
      };
      const data: PostulanteActualizarRequest = {
         dni: dni,
         nombre: nombre,
         apellido_paterno: apellidoPaterno,
         apellido_materno: apellidoMaterno,
         direccion: direccion,
         telefono: telefono,
         observacion: observacion,
         fecha_actualizacion: fecha_registro,
         fk_postulante_estado: fkPostulanteEstado,
         fk_operador: fkOperador,
         fk_usuario: isteneSesion.usuario_id,
         lst_postulante_carrera: arrayCandCarrera,
         cls_postulante_historial: dataHistorial,
      };
      activarCarga(true);
      await srvPostulante
         .actualizarIndividual(id, data)
         .then(() => {
            setOpcionGestion(funValidarOpcionGestion("0"));
            mostrarNotificacion({
               tipo: "success",
               detalle: "Postulante actualizado exitosamente",
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   const AddContact = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
         const contact: Contacts.Contact = {
            [Contacts.Fields.ID]: "JJJ-UNIQUE",
            [Contacts.Fields.ContactType]: "person",
            [Contacts.Fields.Name]: "Nuevo Numero",
            [Contacts.Fields.PhoneNumbers]: [
               {
                  id: "JJJ-UNIQUE",
                  label: "JJJ",
                  number: "(81) 8420-0123",
                  digits: "8184200123",
               },
            ],
            [Contacts.Fields.FirstName]: "Bird",
            [Contacts.Fields.LastName]: "Man",
            [Contacts.Fields.Company]: "Young Money",
         };
         await Contacts.addContactAsync(contact);
      }
   };

   return (
      <ContainerCustom>
         <HeaderCustom
            title="Postulante / Gestionar"
            isSecondaryPage={true}
            urlBack={"/(home)/inicio/postulante/"}
         />
         <ContainerWebCustom>
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
                  <ModoVisualizacionCustom
                     textStyle={{
                        backgroundColor: opcionGestion.color,
                        padding: 10,
                        borderRadius: 5,
                        color: "#fff",
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
                              if (opcionGestion.tipo === OpcionGestion.EDITAR) {
                                 const srvPostulante = new PostulanteService();
                                 setOpcionGestion(funValidarOpcionGestion("0"));

                                 funPostulanteListarIndividual(
                                    srvPostulante.obtenerIdDeURL(
                                       url_postulante_id
                                    )
                                 );
                              } else {
                                 setOpcionGestion(funValidarOpcionGestion("2"));
                              }
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
                           onPress={AddContact}
                        />
                     </View>
                  )}
               </View>
               {opcionGestion.tipo === OpcionGestion.REGISTRAR ? (
                  <TitleCustom text="Datos Sistema:" textSize={15} />
               ) : (
                  <TitleCustom
                     text="Datos Registro:"
                     textSize={15}
                     usuarioActualizacion={usuarioActualizacion}
                     fechaActualizacion={formatoFecha(fechaActualizacion)}
                  />
               )}

               <InputDateTimeCustom
                  title="Fecha"
                  value={fechaRegistro}
                  functionChangeText={setFechaRegistro}
                  inputIsEditable={false}
                  inputIsRequired={true}
               />
               <InputTextCustom
                  title="Usuario"
                  placeholder="Ingrese usuario"
                  value={usuarioRegistro}
                  functionChangeText={setUsuarioRegistro}
                  keyboardType="default"
                  maxLength={45}
                  inputIsEditable={false}
                  inputIsRequired={true}
               />
               <TitleCustom text="Datos Estado:" textSize={15} />
               <SelectCustom
                  title="Estado Postulante"
                  value={fkPostulanteEstado}
                  onChangeValue={setFkPostulanteEstado}
                  items={arrayPostulanteEstado}
                  pickerIsEditable={opcionGestion.esEditable}
                  pickerIsRequired={true}
               />
               <TitleCustom text="Datos Personales:" textSize={15} />
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
               <SelectCustom
                  title="Operador Telefónico"
                  value={fkOperador}
                  onChangeValue={setFkOperador}
                  items={arrayOperador}
                  pickerIsEditable={opcionGestion.esEditable}
                  pickerIsRequired={true}
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
               <TitleCustom text="Datos Carrera:" textSize={15} />
               <SelectCustom
                  title="Opción 1"
                  value={carreraOpcionUno}
                  onChangeValue={setCarreraOpcionUno}
                  items={arrayCarrera}
                  pickerIsEditable={opcionGestion.esEditable}
                  pickerIsRequired={true}
               />
               <SelectCustom
                  title="Opción 2"
                  value={carreraOpcionDos}
                  onChangeValue={setCarreraOpcionDos}
                  items={arrayCarrera}
                  pickerIsEditable={opcionGestion.esEditable}
               />
               <SelectCustom
                  title="Opción 3"
                  value={carreraOpcionTres}
                  onChangeValue={setCarreraOpcionTres}
                  items={arrayCarrera}
                  pickerIsEditable={opcionGestion.esEditable}
               />
               <TitleCustom text="Datos Complementarios:" textSize={15} />
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
                        ? funPostulanteRegistarIndividual()
                        : funPostulanteActualizarIndividual(postulanteId);
                  }}
               />
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
};

export default gestionar;
