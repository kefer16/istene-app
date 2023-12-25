import { View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ContainerCustom from "../../../components/ContainerCustom";
import HeaderCustom from "../../../components/HeaderCustom";
import TitleCustom from "../../../components/TitleCustom";
import CardCustom from "../../../components/CardCustom";
import ButtonOptionCustom from "../../../components/ButtonOptionCustom";
import { IsteneSesionContext } from "../../../components/sesion/Sesion.component";
import { router } from "expo-router";
import ContainerWebCustom from "../../../components/ContainerWebCustom";
import { PostulanteService } from "../../../services/postulante.service";
import { CarreraService } from "../../../services/carrera.service";

const index = () => {
   const { isteneSesion, obtenerSesion, mostrarNotificacion, activarCarga } =
      useContext(IsteneSesionContext);
   const [nroPostulantesRegistrados, setNroPostulantesRegistrados] =
      useState<number>(0);
   const [nroPostulantesPendientes, setNroPostulantesPendientes] =
      useState<number>(0);
   const [nroPostulantesLlamados, setNroPostulantesLlamados] =
      useState<number>(0);
   const [nroPostulantesConfirmados, setNroPostulantesConfirmados] =
      useState<number>(0);
   const [nroPostulantesRechazados, setNroPostulantesRechazados] =
      useState<number>(0);
   const [nroCarrerasActivas, setNroCarrerasActivas] = useState<number>(0);

   const funObtenerEstadisticasRegistrados = async () => {
      const srvPostulante = new PostulanteService();

      await srvPostulante
         .listarIndividualCantidadPorEstado("TODOS")
         .then((resp) => {
            setNroPostulantesRegistrados(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };

   const funObtenerEstadisticasPendiente = async () => {
      const srvPostulante = new PostulanteService();

      await srvPostulante
         .listarIndividualCantidadPorEstado("PEND")
         .then((resp) => {
            setNroPostulantesPendientes(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };
   const funObtenerEstadisticasLlamados = async () => {
      const srvPostulante = new PostulanteService();

      await srvPostulante
         .listarIndividualCantidadPorEstado("LLAM")
         .then((resp) => {
            setNroPostulantesLlamados(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };
   const funObtenerEstadisticasConfirmados = async () => {
      const srvPostulante = new PostulanteService();

      await srvPostulante
         .listarIndividualCantidadPorEstado("CONF")
         .then((resp) => {
            setNroPostulantesConfirmados(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };

   const funObtenerEstadisticasRechazados = async () => {
      const srvPostulante = new PostulanteService();

      await srvPostulante
         .listarIndividualCantidadPorEstado("RETI")
         .then((resp) => {
            setNroPostulantesRechazados(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };

   const funObtenerEstadisticasCarreras = async () => {
      const srvCarrera = new CarreraService();

      await srvCarrera
         .listarIndividualNroActivos()
         .then((resp) => {
            setNroCarrerasActivas(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };

   useEffect(() => {
      const obtenerData = async () => {
         activarCarga(true);
         obtenerSesion();
         await funObtenerEstadisticasRegistrados();
         await funObtenerEstadisticasPendiente();
         await funObtenerEstadisticasLlamados();
         await funObtenerEstadisticasConfirmados();
         await funObtenerEstadisticasRechazados();
         await funObtenerEstadisticasCarreras();
         activarCarga(false);
      };
      obtenerData();
   }, []);

   return (
      <ContainerCustom>
         <HeaderCustom
            title={`Bienvenid@ ${isteneSesion.usuario} `}
            isSecondaryPage={false}
         />
         <ContainerWebCustom>
            <View
               style={{
                  flex: 1,
                  flexDirection: "column",
                  paddingHorizontal: 10,
               }}
            >
               <TitleCustom
                  textStyle={{ marginTop: 10 }}
                  textSize={20}
                  text="Estadísticas de Postulantes"
               />
               <View
                  style={{
                     // backgroundColor: "green",
                     // flex: 1,
                     width: "100%",
                     height: "auto",
                     flexDirection: "row",
                     flexWrap: "wrap",
                     paddingVertical: 10,
                     gap: 10,
                  }}
               >
                  <CardCustom
                     title="Total Registrados"
                     text=""
                     iconName={"person-add"}
                     quantity={nroPostulantesRegistrados}
                     viewBackgroundColor="#2A166D"
                  />
                  <CardCustom
                     title="Total Pendientes"
                     text=""
                     iconName={"person"}
                     quantity={nroPostulantesPendientes}
                     viewBackgroundColor="#ff9800"
                  />
                  <CardCustom
                     title="Total Llamados"
                     text=""
                     quantity={nroPostulantesLlamados}
                     iconName={"call"}
                     viewBackgroundColor="#00bcd4"
                  />
                  <CardCustom
                     title="Total Confirmados"
                     text=""
                     quantity={nroPostulantesConfirmados}
                     iconName={"checkmark-circle"}
                     viewBackgroundColor="#8bc34a"
                  />

                  <CardCustom
                     title="Total Retirados"
                     text=""
                     quantity={nroPostulantesRechazados}
                     iconName={"close-circle"}
                     viewBackgroundColor="#f44336"
                  />
                  <CardCustom
                     title="Total Carreras Activas"
                     text=""
                     quantity={nroCarrerasActivas}
                     iconName={"school"}
                     viewBackgroundColor="#009688"
                  />
               </View>
               <TitleCustom
                  textStyle={{ marginTop: 10 }}
                  textSize={20}
                  text="¿Qué deseas hacer hoy?"
               />
               <View
                  style={{
                     flex: 1,
                     flexDirection: "column",
                     paddingVertical: 10,
                     gap: 10,
                  }}
               >
                  <ButtonOptionCustom
                     textTitle="Postulante"
                     textDescription="Gestionar datos de los postulantes"
                     iconName={"person"}
                     onPress={() => {
                        router.push("/(home)/inicio/postulante/");
                     }}
                  />

                  <ButtonOptionCustom
                     textTitle="Carrera"
                     textDescription="Gestionar Carreras"
                     iconName={"school"}
                     onPress={() => {
                        router.push("/(home)/inicio/carrera/");
                     }}
                  />
               </View>
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
};

export default index;
