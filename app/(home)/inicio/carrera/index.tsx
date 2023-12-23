import React, { useContext, useEffect, useState } from "react";
import HeaderCustom from "../../../../components/HeaderCustom";
import ContainerCustom from "../../../../components/ContainerCustom";
import { IsteneSesionContext } from "../../../../components/sesion/Sesion.component";
import { CarreraListarGrupalNombreResponse } from "../../../../interfaces/responses/carrera.response";
import { CarreraService } from "../../../../services/carrera.service";
import { View } from "react-native";
import InputTextSearchCustom from "../../../../components/InputTextSearchCustom";
import ButtonCrudCustom from "../../../../components/ButtonCrudCustom";
import { router } from "expo-router";
import { OpcionGestion } from "../../../../constants/OpcionGestion";
import CardButtonCustom from "../../../../components/CardButtonCustom";
import ContainerWebCustom from "../../../../components/ContainerWebCustom";

const index = () => {
   const { mostrarNotificacion, activarCarga } =
      useContext(IsteneSesionContext);

   const [busqueda, setBusqueda] = useState<string>("");
   const [arrayCarreras, setArrayCarreras] = useState<
      CarreraListarGrupalNombreResponse[]
   >([]);

   const funCarreraListarGrupal = async (nombre: string) => {
      const srvCarrera = new CarreraService();

      await srvCarrera
         .listarGrupalNombre(nombre)
         .then((resp) => {
            setArrayCarreras(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };

   useEffect(() => {
      const obtenerDatos = async () => {
         activarCarga(true);
         await funCarreraListarGrupal(busqueda);
         activarCarga(false);
      };
      obtenerDatos();
   }, []);
   return (
      <ContainerCustom>
         <HeaderCustom
            title="Carrera"
            isSecondaryPage={true}
            urlBack={"/(home)/inicio/"}
         />
         <ContainerWebCustom>
            <View
               style={{
                  flex: 1,
                  flexDirection: "column",
                  paddingHorizontal: 10,
                  paddingTop: 10,
                  gap: 10,
               }}
            >
               <InputTextSearchCustom
                  title="Buscar por Nombre"
                  placeholder="Ingrese nombre a buscar"
                  keyboardType="web-search"
                  value={busqueda}
                  functionChangeText={setBusqueda}
                  funButtonSearch={() => funCarreraListarGrupal(busqueda)}
               />
               <ButtonCrudCustom
                  buttonBackgroundColor="#8bc34a"
                  isEnabled={true}
                  text="Agregar Carrera"
                  onPress={() => {
                     router.push(
                        `/inicio/carrera/gestionar?url_opcion_gestion=${OpcionGestion.REGISTRAR}`
                     );
                  }}
               />
            </View>

            <View
               style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 10,
                  gap: 10,
                  // padding: 10,
               }}
            >
               {arrayCarreras.map((item: CarreraListarGrupalNombreResponse) => {
                  return (
                     <CardButtonCustom
                        key={item.carrera_id}
                        textTitle={item.fecha_registro.toString()}
                        textDescription={item.nombre}
                        footerTextFecha={item.fecha_actualizacion.toString()}
                        footerTextUsuario={
                           item.lst_carrera_historial[0].cls_usuario.usuario
                        }
                        etiquetaValor={item.activo ? "ACTI" : "INAC"}
                        etiquetaColor={item.activo ? "#8bc34a" : "#f44336"}
                        onPress={() =>
                           router.push(
                              `/inicio/carrera/gestionar?url_opcion_gestion=${OpcionGestion.VISUALIZAR}&url_carrera_id=${item.carrera_id}`
                           )
                        }
                     />
                  );
               })}
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
};

export default index;
