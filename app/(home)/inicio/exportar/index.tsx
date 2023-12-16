import React from "react";
import HeaderCustom from "../../../../components/HeaderCustom";
import ContainerCustom from "../../../../components/ContainerCustom";

const index = () => {
   return (
      <ContainerCustom>
         <HeaderCustom
            title="Exportar"
            isSecondaryPage={true}
            urlBack={"/(home)/inicio/"}
         />
      </ContainerCustom>
   );
};

export default index;
