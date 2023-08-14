/* -> Importaciones */
import React, { useContext, useEffect } from "react";
import Administracion from '../components/Administracion';
import NavBarAdministracion from '../components/Navbars/NavBarAdministracion';
import { InstContext } from "../context/InstitucionContext";


function Administrador() {
  const { nombreInst, mailInst, celularInst, openInstModal, showModalInst } = useContext(InstContext);

  useEffect(() => {
    // Verificar si no hay datos en la institución
    if (!nombreInst && !mailInst && !celularInst) {
      openInstModal();
    }
  }, [nombreInst, mailInst, celularInst, openInstModal]);

  return (
    <>
      <NavBarAdministracion/>
      <Administracion/>
    </>
  )
}

export default Administrador;
