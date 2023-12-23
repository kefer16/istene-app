import React, { useContext, useEffect, useState } from "react";
import ContainerCustom from "../../../../components/ContainerCustom";
import HeaderCustom from "../../../../components/HeaderCustom";
import { View } from "react-native";
import InputTextSearchCustom from "../../../../components/InputTextSearchCustom";
import CardButtonCustom from "../../../../components/CardButtonCustom";
import { router } from "expo-router";
import { CandidatoService } from "../../../../services/candidato.service";
import { CandidatoListarGrupalDNIResponse } from "../../../../interfaces/responses/candidato.response";
import { IsteneSesionContext } from "../../../../components/sesion/Sesion.component";
import { OpcionGestion } from "../../../../constants/OpcionGestion";
import ButtonCrudCustom from "../../../../components/ButtonCrudCustom";
import ContainerWebCustom from "../../../../components/ContainerWebCustom";

const index = () => {
   const { mostrarNotificacion, activarCarga } =
      useContext(IsteneSesionContext);

   const [busqueda, setBusqueda] = useState<string>("");
   const [arrayCandidatos, setArrayCandidatos] = useState<
      CandidatoListarGrupalDNIResponse[]
   >([]);

   const funCandidatosListarGrupal = async (dni: string) => {
      const srvCandidato = new CandidatoService();

      await srvCandidato
         .listarGrupalDni(dni)
         .then((resp: CandidatoListarGrupalDNIResponse[]) => {
            setArrayCandidatos(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };

   useEffect(() => {
      const obtenerDatos = async () => {
         activarCarga(true);
         await funCandidatosListarGrupal(busqueda);
         activarCarga(false);
      };
      obtenerDatos();
   }, []);

   return (
      <ContainerCustom>
         <HeaderCustom
            title="Candidato"
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
                  title="Buscar por DNI"
                  placeholder="Ingrese DNI a buscar"
                  keyboardType="web-search"
                  value={busqueda}
                  functionChangeText={setBusqueda}
                  funButtonSearch={() => funCandidatosListarGrupal(busqueda)}
               />
               <ButtonCrudCustom
                  buttonBackgroundColor="#8bc34a"
                  isEnabled={true}
                  text="Agregar Candidato"
                  onPress={() => {
                     router.push(
                        `/inicio/candidato/gestionar?url_opcion_gestion=${OpcionGestion.REGISTRAR}`
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
               {arrayCandidatos.map(
                  (item: CandidatoListarGrupalDNIResponse) => {
                     return (
                        <CardButtonCustom
                           key={item.candidato_id}
                           textTitle={`${item.dni} / ${item.lst_candidato_carrera[0].cls_carrera.nombre}`}
                           textDescription={`${item.apellido_paterno} ${item.apellido_materno}, ${item.nombre}`}
                           footerTextFecha={item.fecha_actualizacion.toString()}
                           footerTextUsuario={
                              item.lst_candidato_historial[0].cls_usuario
                                 .usuario
                           }
                           etiquetaValor={item.cls_candidato_estado.abreviatura}
                           etiquetaColor={CandidatoService.obtenerColorEstado(
                              item.cls_candidato_estado.abreviatura
                           )}
                           onPress={() =>
                              router.push(
                                 `/inicio/candidato/gestionar?url_opcion_gestion=${OpcionGestion.VISUALIZAR}&url_candidato_id=${item.candidato_id}`
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
