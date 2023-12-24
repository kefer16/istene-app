import React, { useContext, useEffect, useState } from "react";
import ContainerCustom from "../../../../components/ContainerCustom";
import HeaderCustom from "../../../../components/HeaderCustom";
import { View } from "react-native";
import InputTextSearchCustom from "../../../../components/InputTextSearchCustom";
import CardButtonCustom from "../../../../components/CardButtonCustom";
import { router } from "expo-router";
import { PostulanteService } from "../../../../services/postulante.service";
import { PostulanteListarGrupalDNIResponse } from "../../../../interfaces/responses/postulante.response";
import { IsteneSesionContext } from "../../../../components/sesion/Sesion.component";
import { OpcionGestion } from "../../../../constants/OpcionGestion";
import ButtonCrudCustom from "../../../../components/ButtonCrudCustom";
import ContainerWebCustom from "../../../../components/ContainerWebCustom";
import { formatoFecha } from "../../../../utils/funciones.util";
import TitleCustom from "../../../../components/TitleCustom";
import SelectCustom, { Option } from "../../../../components/SelectCustom";
import { PostulanteEstadoService } from "../../../../services/postulante_estado.service";

const index = () => {
   const { mostrarNotificacion, activarCarga } =
      useContext(IsteneSesionContext);

   const [dni, setDni] = useState<string>("");
   const [arrayPostulantes, setArrayPostulantes] = useState<
      PostulanteListarGrupalDNIResponse[]
   >([]);
   const [arrayPostulanteEstado, setArrayPostulanteEstado] = useState<Option[]>(
      []
   );
   const [fkPostulanteEstado, setFkPostulanteEstado] = useState<string>("0");

   const funLlenarComboPostulanteEstado = async () => {
      const srvCandEstado = new PostulanteEstadoService();
      activarCarga(true);
      await srvCandEstado
         .llenarComboFiltros()
         .then((resp) => {
            setArrayPostulanteEstado(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "warn", detalle: error.message });
         });
      activarCarga(false);
   };

   const funPostulantesListarGrupal = async (
      dni: string,
      estadoPostulante: string
   ) => {
      const srvPostulante = new PostulanteService();
      activarCarga(true);
      await srvPostulante
         .listarGrupalDni(dni, estadoPostulante)
         .then((resp: PostulanteListarGrupalDNIResponse[]) => {
            setArrayPostulantes(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   useEffect(() => {
      const obtenerDatos = async () => {
         await funLlenarComboPostulanteEstado();
         await funPostulantesListarGrupal(dni, "-1");
      };
      obtenerDatos();
   }, []);

   return (
      <ContainerCustom>
         <HeaderCustom
            title="Postulante"
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
               <TitleCustom text="Búsqueda del Postulante" textSize={15} />
               <SelectCustom
                  title="Estado Postulante"
                  value={fkPostulanteEstado}
                  onChangeValue={setFkPostulanteEstado}
                  items={arrayPostulanteEstado}
                  pickerIsEditable={true}
               />
               <InputTextSearchCustom
                  title="Buscar por DNI"
                  placeholder="Ingrese DNI a buscar"
                  keyboardType="web-search"
                  value={dni}
                  functionChangeText={setDni}
                  funButtonSearch={() =>
                     funPostulantesListarGrupal(dni, fkPostulanteEstado)
                  }
               />
               <ButtonCrudCustom
                  buttonBackgroundColor="#8bc34a"
                  isEnabled={true}
                  text="Agregar Postulante"
                  onPress={() => {
                     router.push(
                        `/inicio/postulante/gestionar?url_opcion_gestion=${OpcionGestion.REGISTRAR}`
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
               {arrayPostulantes.map(
                  (item: PostulanteListarGrupalDNIResponse) => {
                     return (
                        <CardButtonCustom
                           key={item.postulante_id}
                           textTitle={`${item.dni} / ${item.lst_postulante_carrera[0].cls_carrera.nombre}`}
                           textDescription={`${item.apellido_paterno} ${item.apellido_materno}, ${item.nombre}`}
                           footerTextFecha={formatoFecha(
                              item.fecha_actualizacion
                           )}
                           footerTextUsuario={
                              item.lst_postulante_historial[0].cls_usuario
                                 .usuario
                           }
                           etiquetaValor={
                              item.cls_postulante_estado.abreviatura
                           }
                           etiquetaColor={PostulanteService.obtenerColorEstado(
                              item.cls_postulante_estado.abreviatura
                           )}
                           onPress={() =>
                              router.push(
                                 `/inicio/postulante/gestionar?url_opcion_gestion=${OpcionGestion.VISUALIZAR}&url_postulante_id=${item.postulante_id}`
                              )
                           }
                        />
                     );
                  }
               )}
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
};

export default index;
