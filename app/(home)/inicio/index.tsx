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
import { CandidatoService } from "../../../services/candidato.service";

const index = () => {
   const { isteneSesion, obtenerSesion, mostrarNotificacion, activarCarga } =
      useContext(IsteneSesionContext);
   const [nroCandidatosRegistrados, setNroCandidatosRegistrados] =
      useState<number>(0);
   const [nroCandidatosPendientes, setNroCandidatosPendientes] =
      useState<number>(0);
   const [nroCandidatosLlamados, setNroCandidatosLlamados] =
      useState<number>(0);
   const [nroCandidatosConfirmados, setNroCandidatosConfirmados] =
      useState<number>(0);
   const [nroCandidatosRechazados, setNroCandidatosRechazados] =
      useState<number>(0);

   const funObtenerEstadisticasRegistrados = async () => {
      const srvCandidato = new CandidatoService();

      await srvCandidato
         .listarIndividualCantidadPorEstado("TODOS")
         .then((resp) => {
            setNroCandidatosRegistrados(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "warn", detalle: error.message });
         });
   };

   const funObtenerEstadisticasPendiente = async () => {
      const srvCandidato = new CandidatoService();

      await srvCandidato
         .listarIndividualCantidadPorEstado("PEND")
         .then((resp) => {
            setNroCandidatosPendientes(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "warn", detalle: error.message });
         });
   };
   const funObtenerEstadisticasLlamados = async () => {
      const srvCandidato = new CandidatoService();

      await srvCandidato
         .listarIndividualCantidadPorEstado("LLAM")
         .then((resp) => {
            setNroCandidatosLlamados(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "warn", detalle: error.message });
         });
   };
   const funObtenerEstadisticasConfirmados = async () => {
      const srvCandidato = new CandidatoService();

      await srvCandidato
         .listarIndividualCantidadPorEstado("CONF")
         .then((resp) => {
            setNroCandidatosConfirmados(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "warn", detalle: error.message });
         });
   };

   const funObtenerEstadisticasRechazados = async () => {
      const srvCandidato = new CandidatoService();

      await srvCandidato
         .listarIndividualCantidadPorEstado("RECH")
         .then((resp) => {
            setNroCandidatosRechazados(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "warn", detalle: error.message });
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
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
               <TitleCustom
                  textStyle={{ marginTop: 10 }}
                  textSize={20}
                  text="Estadisticas de Candidatos"
               />
               <View
                  style={{
                     flex: 1,
                     flexDirection: "row",
                     flexWrap: "wrap",
                     paddingVertical: 10,
                     gap: 10,
                  }}
               >
                  <CardCustom
                     title="Total Registrados"
                     text="Hola"
                     iconName={"person"}
                     quantity={nroCandidatosRegistrados}
                     viewBackgroundColor="#2A166D"
                  />
                  <CardCustom
                     title="Total Pendientes"
                     text="Hola"
                     iconName={"person-add"}
                     quantity={nroCandidatosPendientes}
                     viewBackgroundColor="#ff9800"
                  />
                  <CardCustom
                     title="Total Llamados"
                     text="Hola"
                     quantity={nroCandidatosLlamados}
                     iconName={"call"}
                     viewBackgroundColor="#00bcd4"
                  />
                  <CardCustom
                     title="Total Confirmados"
                     text="Hola"
                     quantity={nroCandidatosConfirmados}
                     iconName={"checkmark-circle"}
                     viewBackgroundColor="#8bc34a"
                  />

                  <CardCustom
                     title="Total Rechazados"
                     text="Hola"
                     quantity={nroCandidatosRechazados}
                     iconName={"close-circle"}
                     viewBackgroundColor="#f44336"
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
                     textTitle="Candidato"
                     textDescription="Gestionar datos de los candidatos"
                     iconName={"person"}
                     onPress={() => {
                        router.push("/(home)/inicio/candidato/");
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
                  <ButtonOptionCustom
                     textTitle="Exportar"
                     textDescription="Generar reportes en Excel u otros"
                     iconName={"attach"}
                     onPress={() => {
                        router.push("/(home)/inicio/exportar/");
                     }}
                  />
               </View>
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
};

export default index;
