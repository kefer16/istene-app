import { Alert, Platform, View, useColorScheme } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { IsteneSesionContext } from "../../../../components/sesion/Sesion.component";
import { router, useLocalSearchParams } from "expo-router";
import {
   OpcionGestion,
   OpcionesGestionPros,
   funValidarOpcionGestion,
} from "../../../../constants/OpcionGestion";
import { CarreraService } from "../../../../services/carrera.service";
import { fechaActualISO, formatoFecha } from "../../../../utils/funciones.util";
import ContainerCustom from "../../../../components/ContainerCustom";
import HeaderCustom from "../../../../components/HeaderCustom";
import Colors from "../../../../constants/Colors";
import TitleCustom from "../../../../components/TitleCustom";
import ButtonIconCustom from "../../../../components/ButtonIconCustom";
import InputDateTimeCustom from "../../../../components/InputDateTimeCustom";
import SelectCustom, { Option } from "../../../../components/SelectCustom";
import InputTextCustom from "../../../../components/InputTextCustom";
import ButtonCrudCustom from "../../../../components/ButtonCrudCustom";
import ContainerWebCustom from "../../../../components/ContainerWebCustom";
import ModoVisualizacionCustom from "../../../../components/ModoVisualizacionCustom";
import {
   CarreraActualizarIndividualRequest,
   CarreraHistorialRegistrarIndividualRequest,
   CarreraRegistrarIndividualRequest,
} from "../../../../interfaces/resquests/carrera.request";
import { CarreraListarIndividualResponse } from "../../../../interfaces/responses/carrera.response";

const gestionar = () => {
   const { obtenerSesion, isteneSesion, mostrarNotificacion, activarCarga } =
      useContext(IsteneSesionContext);
   const colorScheme = useColorScheme();

   const [estadosCombo] = useState<Option[]>([
      { label: "-SELECCIONE-", value: "-1" },
      { label: "ACTIVO", value: "1" },
      { label: "INACTIVO", value: "0" },
   ]);

   const { url_carrera_id, url_opcion_gestion } = useLocalSearchParams<{
      url_carrera_id: string;
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
   const [activo, setActivo] = useState<string>("");
   const [carreraId, setCarreraId] = useState<string>("");
   const [nombre, setNombre] = useState<string>("");
   const [descripcion, setDescripcion] = useState<string>("");
   const [usuarioRegistro, setUsuarioRegistro] = useState<string>("");
   const [usuarioActualizacion, setUsuarioActualizacion] = useState<string>("");

   const funCarreraListarIndividual = async (id: string) => {
      if (id === "") {
         setUsuarioRegistro(isteneSesion.usuario);
         return;
      }
      const srvCarrera = new CarreraService();

      await srvCarrera
         .listarIndividual(id)
         .then((resp: CarreraListarIndividualResponse) => {
            setFechaRegistro(resp.fecha_registro);
            setUsuarioRegistro(resp.cls_usuario.usuario);
            setFechaActualizacion(resp.fecha_actualizacion);
            setUsuarioActualizacion(
               resp.lst_carrera_historial[0].cls_usuario.usuario
            );
            setDescripcion(resp.descripcion);
            setNombre(resp.nombre);
            setActivo(resp.activo ? "1" : "0");
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
         const srvCarrera = new CarreraService();
         setCarreraId(srvCarrera.obtenerIdDeURL(url_carrera_id));
         setOpcionGestion(funValidarOpcionGestion(url_opcion_gestion));
         await funCarreraListarIndividual(
            srvCarrera.obtenerIdDeURL(url_carrera_id)
         );
         activarCarga(false);
      };
      obtenerDatos();
   }, []);

   const funValidarCamposCorrectos = (): boolean => {
      if (!nombre) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese nombre" });
         return false;
      }
      if (activo === "-1") {
         mostrarNotificacion({ tipo: "warn", detalle: "Seleccione Estado" });
         return false;
      }
      if (!descripcion) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese descripción" });
         return false;
      }

      return true;
   };

   const funCarreraRegistarIndividual = async () => {
      const srvCarrera = new CarreraService();

      if (!funValidarCamposCorrectos()) {
         return;
      }

      const fecha_registro = fechaActualISO();
      const dataHistorial: CarreraHistorialRegistrarIndividualRequest = {
         fecha_registro: fecha_registro,
         fk_carrera: "",
         fk_usuario: isteneSesion.usuario_id,
      };

      const data: CarreraRegistrarIndividualRequest = {
         nombre: nombre,
         descripcion: descripcion,
         activo: activo === "1",
         fecha_registro: fecha_registro,
         fecha_actualizacion: fecha_registro,
         fk_usuario: isteneSesion.usuario_id,
         cls_carrera_historial: dataHistorial,
      };
      activarCarga(true);
      await srvCarrera
         .registrarIndividual(data)
         .then(() => {
            setOpcionGestion(funValidarOpcionGestion("0"));
            mostrarNotificacion({
               tipo: "success",
               detalle: "Carrera registrada exitosamente",
            });
            router.replace("/(home)/inicio/carrera/");
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   const funCarreraActualizarIndividual = async (id: string) => {
      const srvCarrera = new CarreraService();

      if (!funValidarCamposCorrectos()) {
         return;
      }

      const fecha_registro = fechaActualISO();
      const dataHistorial: CarreraHistorialRegistrarIndividualRequest = {
         fecha_registro: fecha_registro,
         fk_carrera: "",
         fk_usuario: isteneSesion.usuario_id,
      };
      const data: CarreraActualizarIndividualRequest = {
         nombre: nombre,
         descripcion: descripcion,
         activo: activo === "1",
         fecha_actualizacion: fecha_registro,
         fk_usuario: isteneSesion.usuario_id,
         cls_carrera_historial: dataHistorial,
      };
      activarCarga(true);
      await srvCarrera
         .actualizarIndividual(id, data)
         .then(() => {
            setOpcionGestion(funValidarOpcionGestion("0"));
            mostrarNotificacion({
               tipo: "success",
               detalle: "Carrera actualizada exitosamente",
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   const funMensajeConfirmacionEliminar = (id: string) => {
      if (Platform.OS === "web") {
         const opcion = confirm(
            `Seguro de querer eliminar la carrera: ${nombre}`
         );
         if (opcion) {
            funEliminarIndividual(id);
         }
      } else {
         Alert.alert(
            "Confirmación",
            `Seguro de querer eliminar la carrera: ${nombre}`,
            [
               {
                  text: "Cancelar",
                  style: "cancel",
               },
               { text: "Si", onPress: () => funEliminarIndividual(id) },
            ]
         );
      }
   };
   const funEliminarIndividual = async (id: string) => {
      const srvCarrera = new CarreraService();
      activarCarga(true);
      await srvCarrera
         .eliminarIndividual(id)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               detalle: "Se eliminó la carrera correctamente",
            });
            router.replace("/(home)/inicio/carrera/");
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
            return;
         });
      activarCarga(false);
   };
   return (
      <ContainerCustom>
         <HeaderCustom
            title="Carrera / Gestionar"
            isSecondaryPage={true}
            urlBack={"/(home)/inicio/carrera/"}
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
                              opcionGestion.tipo === OpcionGestion.EDITAR
                                 ? setOpcionGestion(
                                      funValidarOpcionGestion("0")
                                   )
                                 : setOpcionGestion(
                                      funValidarOpcionGestion("2")
                                   );
                           }}
                        />
                        <ButtonIconCustom
                           iconName={"trash"}
                           iconColor="#f44336"
                           onPress={() => {
                              funMensajeConfirmacionEliminar(carreraId);
                           }}
                        />
                     </View>
                  )}
               </View>
               {opcionGestion.tipo === OpcionGestion.REGISTRAR ? (
                  <TitleCustom text="Datos Registro:" textSize={15} />
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
                  title="Estado Carrera"
                  value={activo}
                  onChangeValue={setActivo}
                  items={estadosCombo}
                  pickerIsEditable={opcionGestion.esEditable}
                  pickerIsRequired={true}
               />
               <TitleCustom text="Datos Carrera:" textSize={15} />
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
                  title="Descripción"
                  placeholder="Ingrese descripción"
                  value={descripcion}
                  functionChangeText={setDescripcion}
                  keyboardType="default"
                  maxLength={300}
                  inputIsEditable={opcionGestion.esEditable}
                  inputIsRequired={true}
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
                        ? funCarreraRegistarIndividual()
                        : funCarreraActualizarIndividual(carreraId);
                  }}
               />
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
};

export default gestionar;
