import React from 'react'
import Administracion from '../components/Administracion'
import NavBarAdministracion from '../components/Navbars/NavBarAdministracion'
import Error from './Error';


function Administrador({ show = false }) {
  return show ? (
      <>
        <NavBarAdministracion/>
        <Administracion/>
      </>
  ) : (
   <Error mensajeError='¡Se produjo un error en el acceso a la Aplicación!'/>
  );
}

export default Administrador