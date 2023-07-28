/* -> Importaciones */
import React from 'react'
import Administracion from '../components/Administracion'
import NavBarAdministracion from '../components/navbars/NavBarAdministracion'

function Administrador() {
  return (
      <>
        <NavBarAdministracion/>
        <Administracion/>
      </>
  )
}

export default Administrador