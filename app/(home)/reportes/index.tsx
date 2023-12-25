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
import { PostulanteService } from "../../../services/postulante.service";
import { PostulanteReportesListarGrupal } from "../../../interfaces/responses/postulante.response";
import { UsuarioService } from "../../../services/usuario.service";

const Index = () => {
   const { mostrarNotificacion, activarCarga } =
      useContext(IsteneSesionContext);

   const [arrayPostulanteEstado, setArrayPostulanteEstado] = useState<Option[]>(
      []
   );
   const [arrayCarrera, setArrayCarrera] = useState<Option[]>([]);
   const [arrayUsuario, setArrayUsuario] = useState<Option[]>([]);
   const [selectedPrinter] = useState<Print.Printer>();
   const [fkPostulanteEstado, setFkPostulanteEstado] = useState<string>("-1");
   const [fkCarrera, setFkCarrera] = useState<string>("-1");
   const [fkUsuario, setFkUsuario] = useState<string>("-1");

   useEffect(() => {
      const obtenerData = async () => {
         await funLlenarComboPostulanteEstado();
         await funLlenarComboCarrera();
         await funLlenarComboUsuario();
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
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };
   const funLlenarComboUsuario = async () => {
      const srvUsuario = new UsuarioService();
      activarCarga(true);
      await srvUsuario
         .llenarComboFiltro()
         .then((resp) => {
            setArrayUsuario(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   const funImprimir = async (
      fk_estado: string,
      fk_carrera: string,
      fk_usuario: string
   ) => {
      const srvPostulante = new PostulanteService();
      let arrayPostulantes: PostulanteReportesListarGrupal[] = [];

      activarCarga(true);
      await srvPostulante
         .listarGrupalReportesFiltro(fk_estado, fk_carrera, fk_usuario)
         .then((resp) => {
            arrayPostulantes = resp;
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });

      fk_estado =
         arrayPostulanteEstado.find((item) => item.value === fk_estado)
            ?.label ?? "";
      fk_carrera =
         arrayCarrera.find((item) => item.value === fk_carrera)?.label ?? "";
      fk_usuario =
         arrayUsuario.find((item) => item.value === fk_usuario)?.label ?? "";

      const html = srvPostulante.obtenerFormatoHTML(
         fk_estado,
         fk_carrera,
         fk_usuario,
         arrayPostulantes
      );
      await Print.printAsync({
         html,
         printerUrl: selectedPrinter?.url, // iOS only
      });
      activarCarga(false);
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
                  value={fkCarrera}
                  onChangeValue={setFkCarrera}
                  items={arrayCarrera}
               />
               <SelectCustom
                  title="Usuario Registrado"
                  value={fkUsuario}
                  onChangeValue={setFkUsuario}
                  items={arrayUsuario}
               />
               <ButtonCustom
                  text="Impimir"
                  onPress={() =>
                     funImprimir(fkPostulanteEstado, fkCarrera, fkUsuario)
                  }
               />
            </View>
         </ContainerWebCustom>
      </ContainerCustom>
   );
};

export default Index;
