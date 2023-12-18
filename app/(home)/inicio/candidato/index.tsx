import React, { useContext, useEffect, useState } from "react";
import ContainerCustom from "../../../../components/ContainerCustom";
import HeaderCustom from "../../../../components/HeaderCustom";
import { View } from "react-native";
import InputTextSearchCustom from "../../../../components/InputTextSearchCustom";
import CardButtonCustom from "../../../../components/CardButtonCustom";
import { router } from "expo-router";
import { CandidatoService } from "../../../../services/candidato.service";
import { CandidatoResponse } from "../../../../interfaces/responses/candidato.response";
import { IsteneSesionContext } from "../../../../components/sesion/Sesion.component";
import { OpcionGestion } from "../../../../constants/OpcionGestion";
import ButtonCrudCustom from "../../../../components/ButtonCrudCustom";

const index = () => {
   const { mostrarNotificacion } = useContext(IsteneSesionContext);

   const [buscarCandidato, setBuscarCandidato] = useState<string>("");
   const [arrayCandidatos, setArrayCandidatos] = useState<CandidatoResponse[]>(
      []
   );

   const funCandidatosListarGrupal = async () => {
      const srvCandidato = new CandidatoService();

      await srvCandidato
         .listarGrupal()
         .then((resp) => {
            setArrayCandidatos(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
   };

   useEffect(() => {
      funCandidatosListarGrupal();
   }, []);

   return (
      <ContainerCustom>
         <HeaderCustom
            title="Candidato"
            isSecondaryPage={true}
            urlBack={"/(home)/inicio/"}
         />

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
               title="Buscar"
               placeholder="Ingrese nombre a buscar"
               keyboardType="web-search"
               value={buscarCandidato}
               functionChangeText={setBuscarCandidato}
               funButtonSearch={() => {}}
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
               flex: 1,
               flexDirection: "column",
               padding: 10,
               gap: 10,
               // padding: 10,
            }}
         >
            {arrayCandidatos.map((item: CandidatoResponse) => {
               return (
                  <CardButtonCustom
                     key={item.candidato_id}
                     textTitle={item.dni}
                     textDescription={`${item.apellido_paterno} ${item.apellido_materno}, ${item.nombre}`}
                     textFecha={item.fecha_registro.toString()}
                     textCarrera="COMPUTACIÓN E INFORMÁTICA"
                     onPress={() =>
                        router.push(
                           `/inicio/candidato/gestionar?url_opcion_gestion=${OpcionGestion.VISUALIZAR}&url_candidato_id=${item.candidato_id}`
                        )
                     }
                  />
               );
            })}
         </View>
      </ContainerCustom>
   );
};

export default index;
