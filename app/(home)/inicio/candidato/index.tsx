import React from "react";
import ContainerCustom from "../../../../components/ContainerCustom";
import HeaderCustom from "../../../../components/HeaderCustom";

const index = () => {
   return (
      <ContainerCustom>
         <HeaderCustom
            title="Candidato"
            isSecondaryPage={true}
            urlBack={"/(home)/inicio/"}
         />
      </ContainerCustom>
   );
};

export default index;
