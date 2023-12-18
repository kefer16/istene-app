import { View } from "react-native";
import React, { useContext, useEffect } from "react";
import ContainerCustom from "../../../components/ContainerCustom";
import HeaderCustom from "../../../components/HeaderCustom";
import TitleCustom from "../../../components/TitleCustom";
import CardCustom from "../../../components/CardCustom";
import ButtonOptionCustom from "../../../components/ButtonOptionCustom";
import { IsteneSesionContext } from "../../../components/sesion/Sesion.component";
import { router } from "expo-router";

const index = () => {
   const { isteneSesion, obtenerSesion } = useContext(IsteneSesionContext);

   useEffect(() => {
      obtenerSesion();
   }, []);

   return (
      <ContainerCustom>
         <HeaderCustom
            title={`Bienvenid@ ${isteneSesion.usuario} `}
            isSecondaryPage={false}
         />
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
                  iconName={"person-add"}
                  quantity={1000}
                  viewBackgroundColor="#ff9800"
               />
               <CardCustom
                  title="Total Llamados"
                  text="Hola"
                  quantity={100}
                  iconName={"call"}
                  viewBackgroundColor="#00bcd4"
               />
               <CardCustom
                  title="Total Confirmados"
                  text="Hola"
                  quantity={100}
                  iconName={"checkmark-circle"}
                  viewBackgroundColor="#8bc34a"
               />

               <CardCustom
                  title="Total Rechazados"
                  text="Hola"
                  quantity={100}
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
      </ContainerCustom>
   );
};

export default index;
