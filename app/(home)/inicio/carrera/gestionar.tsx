import { View, useColorScheme } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { IsteneSesionContext } from "../../../../components/sesion/Sesion.component";
import { useLocalSearchParams } from "expo-router";
import {
   OpcionGestion,
   OpcionesGestionPros,
   funValidarOpcionGestion,
} from "../../../../constants/OpcionGestion";
import { CarreraService } from "../../../../services/carrera.service";
import { CarreraEntity } from "../../../../entities/carrera.entity";
import { fechaActualISO } from "../../../../utils/funciones.util";
import ContainerCustom from "../../../../components/ContainerCustom";
import HeaderCustom from "../../../../components/HeaderCustom";
import Colors from "../../../../constants/Colors";
import TitleCustom from "../../../../components/TitleCustom";
import ButtonIconCustom from "../../../../components/ButtonIconCustom";
import InputDateTimeCustom from "../../../../components/InputDateTimeCustom";
import SelectCustom from "../../../../components/SelectCustom";
import InputTextCustom from "../../../../components/InputTextCustom";
import ButtonCrudCustom from "../../../../components/ButtonCrudCustom";
import ContainerWebCustom from "../../../../components/ContainerWebCustom";

const gestionar = () => {
   const { obtenerSesion, isteneSesion, mostrarNotificacion } =
      useContext(IsteneSesionContext);
   const colorScheme = useColorScheme();

   const { url_carrera_id, url_opcion_gestion } = useLocalSearchParams<{
      url_carrera_id: string;
      url_opcion_gestion: string;
   }>();

   // const [esEdicion, setEsEdicion] = useState<boolean>(false);
   const [opcionGestion, setOpcionGestion] = useState<OpcionesGestionPros>(
      {} as OpcionesGestionPros
   );
   const [fechaRegistro, setFechaRegistro] = useState<Date>(new Date());
   const [estado, setEstado] = useState<string>("");
   const [carreraId, setCarreraId] = useState<string>("");
   const [nombre, setNombre] = useState<string>("");

   const funCarreraListarIndividual = async (id: string) => {
      if (id === "") {
         return;
      }
      const srvCarrera = new CarreraService();

      await srvCarrera
         .listarIndividual(id)
         .then((resp) => {
            setNombre(resp.nombre);
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
      const srvCarrera = new CarreraService();
      setCarreraId(srvCarrera.obtenerIdDeURL(url_carrera_id));
      setOpcionGestion(funValidarOpcionGestion(url_opcion_gestion));
      funCarreraListarIndividual(srvCarrera.obtenerIdDeURL(url_carrera_id));
   }, []);

   const funValidarCamposCorrectos = (): boolean => {
      if (!nombre) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese nombre" });
         return false;
      }

      return true;
   };

   const funCarreraRegistarIndividual = async () => {
      const srvCarrera = new CarreraService();

      if (!funValidarCamposCorrectos()) {
         return;
      }

      const data: CarreraEntity = {
         carrera_id: "",
         nombre: nombre,
         activo: true,
         fecha_registro: fechaActualISO(),
         fk_usuario: isteneSesion.usuario_id,
      };

      await srvCarrera
         .registrarIndividual(data)
         .then(() => {
            setOpcionGestion(funValidarOpcionGestion("0"));
            mostrarNotificacion({
               tipo: "success",
               detalle: "Carrera registrada exitosamente",
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };

   const funCarreraActualizarIndividual = async (id: string) => {
      const srvCarrera = new CarreraService();

      if (!funValidarCamposCorrectos()) {
         return;
      }

      const data: CarreraEntity = {
         carrera_id: "",
         nombre: nombre,
         activo: true,
         fecha_registro: fechaActualISO(),
         fk_usuario: isteneSesion.usuario_id,
      };

      srvCarrera
         .actualizarIndividual(id, data)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               detalle: "Carrera actualizada exitosamente",
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
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
