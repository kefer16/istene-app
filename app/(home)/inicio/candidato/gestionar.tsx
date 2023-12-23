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
import { CandidatoService } from "../../../../services/candidato.service";
import { fechaActualISO } from "../../../../utils/funciones.util";
import { useLocalSearchParams } from "expo-router";
import ButtonIconCustom from "../../../../components/ButtonIconCustom";
import {
   OpcionGestion,
   OpcionesGestionPros,
   funValidarOpcionGestion,
} from "../../../../constants/OpcionGestion";
import ButtonCrudCustom from "../../../../components/ButtonCrudCustom";
import ContainerWebCustom from "../../../../components/ContainerWebCustom";
import { CandidatoEstadoService } from "../../../../services/candidato_estado.service";
import { CarreraService } from "../../../../services/carrera.service";
import {
   CandidatoActualizarRequest,
   CandidatoCarreraRequest,
   CandidatoHistorialRequest,
   CandidatoRequest,
} from "../../../../interfaces/resquests/candidato.request";
import { OperadorService } from "../../../../services/operador.service";
import { CandidatoListarIndividualResponse } from "../../../../interfaces/responses/candidato.response";
import ModoVisualizacionCustom from "../../../../components/ModoVisualizacionCustom";

const gestionar = () => {
   const { obtenerSesion, isteneSesion, mostrarNotificacion, activarCarga } =
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
   const [fechaActualizacion, setFechaActualizacion] = useState<Date>(
      new Date()
   );
   const [candidatoId, setCandidatoId] = useState<string>("");
   const [dni, setDni] = useState<string>("");
   const [nombre, setNombre] = useState<string>("");
   const [apellidoPaterno, setApellidoPaterno] = useState<string>("");
   const [apellidoMaterno, setApellidoMaterno] = useState<string>("");
   const [telefono, setTelefono] = useState<string>("");
   const [direccion, setDireccion] = useState<string>("");
   const [observacion, setObservacion] = useState<string>("");
   const [usuarioActualizacion, setUsuarioActualizacion] = useState<string>("");
   const [arrayCandidatoEstado, setArrayCandidatoEstado] = useState<Option[]>(
      []
   );
   const [fkCandidatoEstado, setFkCandidatoEstado] = useState<string>("0");

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

   const funLlenarComboCandidatoEstado = async () => {
      const srvCandEstado = new CandidatoEstadoService();

      await srvCandEstado
         .llenarCombo()
         .then((resp) => {
            setArrayCandidatoEstado(resp);
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
   const funCandidatoListarIndividual = async (id: string) => {
      if (id === "") {
         return;
      }
      const srvCandidato = new CandidatoService();

      await srvCandidato
         .listarIndividual(id)
         .then((resp: CandidatoListarIndividualResponse) => {
            setFechaActualizacion(resp.fecha_actualizacion);
            setFkCandidatoEstado(resp.fk_candidato_estado);
            setDni(resp.dni);
            setNombre(resp.nombre);
            setApellidoPaterno(resp.apellido_paterno);
            setApellidoMaterno(resp.apellido_materno);
            setFkOperador(resp.fk_operador);
            setTelefono(resp.telefono);
            setDireccion(resp.direccion);
            setObservacion(resp.observacion);
            setUsuarioActualizacion(
               resp.lst_candidato_historial[0].cls_usuario.usuario
            );

            setCarreraOpcionUno(
               resp.lst_candidato_carrera.find(
                  (item) => item.numero_opcion === 1
               )?.fk_carrera ?? "0"
            );
            setCarreraOpcionDos(
               resp.lst_candidato_carrera.find(
                  (item) => item.numero_opcion === 2
               )?.fk_carrera ?? "0"
            );
            setCarreraOpcionTres(
               resp.lst_candidato_carrera.find(
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
         const srvCandidato = new CandidatoService();
         setCandidatoId(srvCandidato.obtenerIdDeURL(url_candidato_id));
         setOpcionGestion(funValidarOpcionGestion(url_opcion_gestion));
         await funLlenarComboCandidatoEstado();
         await funLlenarComboOperador();
         await funLlenarComboCarrera();
         await funCandidatoListarIndividual(
            srvCandidato.obtenerIdDeURL(url_candidato_id)
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

      const arrayCandCarrera: CandidatoCarreraRequest[] = [];

      if (carreraOpcionUno !== "0") {
         arrayCandCarrera.push({
            numero_opcion: 1,
            activo: true,
            fk_candidato: "",
            fk_carrera: carreraOpcionUno,
         });
      }

      if (carreraOpcionDos !== "0") {
         arrayCandCarrera.push({
            numero_opcion: 2,
            activo: true,
            fk_candidato: "",
            fk_carrera: carreraOpcionDos,
         });
      }

      if (carreraOpcionTres !== "0") {
         arrayCandCarrera.push({
            numero_opcion: 3,
            activo: true,
            fk_candidato: "",
            fk_carrera: carreraOpcionTres,
         });
      }
      const fecha_registro = fechaActualISO();
      const dataHistorial: CandidatoHistorialRequest = {
         fecha_registro: fecha_registro,
         fk_candidato: "",
         fk_usuario: isteneSesion.usuario_id,
      };

      const data: CandidatoRequest = {
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
         fk_candidato_estado: fkCandidatoEstado,
         lst_candidato_carrera: arrayCandCarrera,
         cls_candidato_historial: dataHistorial,
      };

      activarCarga(true);
      await srvCandidato
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
      activarCarga(false);
   };

   const funCandidatoActualizarIndividual = async (id: string) => {
      const srvCandidato = new CandidatoService();

      if (!funValidarCamposCorrectos()) {
         return;
      }

      const arrayCandCarrera: CandidatoCarreraRequest[] = [];

      if (carreraOpcionUno !== "0") {
         arrayCandCarrera.push({
            numero_opcion: 1,
            activo: true,
            fk_candidato: "",
            fk_carrera: carreraOpcionUno,
         });
      }

      if (carreraOpcionDos !== "0") {
         arrayCandCarrera.push({
            numero_opcion: 2,
            activo: true,
            fk_candidato: "",
            fk_carrera: carreraOpcionDos,
         });
      }

      if (carreraOpcionTres !== "0") {
         arrayCandCarrera.push({
            numero_opcion: 3,
            activo: true,
            fk_candidato: "",
            fk_carrera: carreraOpcionTres,
         });
      }
      const fecha_registro = fechaActualISO();
      const dataHistorial: CandidatoHistorialRequest = {
         fecha_registro: fecha_registro,
         fk_candidato: "",
         fk_usuario: isteneSesion.usuario_id,
      };
      const data: CandidatoActualizarRequest = {
         dni: dni,
         nombre: nombre,
         apellido_paterno: apellidoPaterno,
         apellido_materno: apellidoMaterno,
         direccion: direccion,
         telefono: telefono,
         observacion: observacion,
         fecha_actualizacion: fecha_registro,
         fk_candidato_estado: fkCandidatoEstado,
         fk_operador: fkOperador,
         fk_usuario: isteneSesion.usuario_id,
         lst_candidato_carrera: arrayCandCarrera,
         cls_candidato_historial: dataHistorial,
      };
      activarCarga(true);
      await srvCandidato
         .actualizarIndividual(id, data)
         .then(() => {
            setOpcionGestion(funValidarOpcionGestion("0"));
            mostrarNotificacion({
               tipo: "success",
               detalle: "Candidato actualizado exitosamente",
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   return (
      <ContainerCustom>
         <HeaderCustom
            title="Candidato / Gestionar"
            isSecondaryPage={true}
            urlBack={"/(home)/inicio/candidato/"}
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
                                 const srvCandidato = new CandidatoService();
                                 setOpcionGestion(funValidarOpcionGestion("0"));

                                 funCandidatoListarIndividual(
                                    srvCandidato.obtenerIdDeURL(
                                       url_candidato_id
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
                           onPress={() => {}}
                        />
                     </View>
                  )}
               </View>
               <TitleCustom
                  text="Datos Sistema:"
                  textSize={15}
                  textoAlternativo={`${fechaActualizacion.toString()} - ${usuarioActualizacion}`}
               />

               <InputDateTimeCustom
                  title="Fecha Registro"
                  value={fechaRegistro}
                  onChange={setFechaRegistro}
                  inputIsEditable={false}
                  inputIsRequired={true}
               />
               <SelectCustom
                  title="Estado Candidato"
                  value={fkCandidatoEstado}
                  onChangeValue={setFkCandidatoEstado}
                  items={arrayCandidatoEstado}
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
                        ? funCandidatoRegistarIndividual()
                        : funCandidatoActualizarIndividual(candidatoId);
                  }}
               />
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
};

export default gestionar;
