import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import * as Print from "expo-print";
import ContainerCustom from "../../../components/ContainerCustom";
import HeaderCustom from "../../../components/HeaderCustom";
import { PostulanteEstadoService } from "../../../services/postulante_estado.service";
import { IsteneSesionContext } from "../../../components/sesion/Sesion.component";
import SelectCustom, { Option } from "../../../components/SelectCustom";
import ContainerWebCustom from "../../../components/ContainerWebCustom";
import TitleCustom from "../../../components/TitleCustom";
import ButtonCustom from "../../../components/ButtonCustom";
import { CarreraService } from "../../../services/carrera.service";
const html = `
   <html>
   
   <body style="text-align: center;">
      <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
         Hello Expo!
      </h1>
      
   </body>
   </html>
   `;
const Index = () => {
   const { mostrarNotificacion, activarCarga } =
      useContext(IsteneSesionContext);

   const [arrayPostulanteEstado, setArrayPostulanteEstado] = useState<Option[]>(
      []
   );
   const [arrayCarrera, setArrayCarrera] = useState<Option[]>([]);
   const [selectedPrinter] = useState<Print.Printer>();
   const [fkPostulanteEstado, setFkPostulanteEstado] = useState<string>("-1");
   const [carreraOpcionUno, setCarreraOpcionUno] = useState<string>("-1");

   useEffect(() => {
      const obtenerData = async () => {
         await funLlenarComboPostulanteEstado();
         await funLlenarComboCarrera();
      };
      obtenerData();
   }, []);

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
   const funLlenarComboCarrera = async () => {
      const srvCarrera = new CarreraService();
      activarCarga(true);
      await srvCarrera
         .llenarComboFiltro()
         .then((resp) => {
            setArrayCarrera(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "warn", detalle: error.message });
         });
      activarCarga(false);
   };
   const funImprimir = async () => {
      await Print.printAsync({
         html,
         printerUrl: selectedPrinter?.url, // iOS only
      });
   };

   return (
      <ContainerCustom>
         <HeaderCustom
            title="Reportes"
            isSecondaryPage={false}
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
               <TitleCustom
                  text="Generar Reporte de Postulantes"
                  textSize={15}
               />
               <SelectCustom
                  title="Estado Postulante"
                  value={fkPostulanteEstado}
                  onChangeValue={setFkPostulanteEstado}
                  items={arrayPostulanteEstado}
                  pickerIsEditable={true}
               />
               <SelectCustom
                  title="Carrera Postulante"
                  value={carreraOpcionUno}
                  onChangeValue={setCarreraOpcionUno}
                  items={arrayCarrera}
               />
               <ButtonCustom text="Impimir" onPress={funImprimir} />
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
};

export default Index;
