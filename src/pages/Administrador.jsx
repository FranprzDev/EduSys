import React from 'react'
import Administracion from '../components/Administracion'
import NavBarAdministracion from '../components/Navbars/NavBarAdministracion'
import Error from './NotFound';


function Administrador({ show = false }) {
  return (
      <>
        <NavBarAdministracion/>
        <Administracion/>
      </>
  )
  // ) : (
  //  <Error mensajeError='¡Se produjo un error en el acceso a la Aplicación!'/>
  // );
}

export default Administrador