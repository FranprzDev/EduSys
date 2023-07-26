import React, { useState } from 'react'
import NavBarAdministracion from '../components/Navbars/NavBarAdministracion'
import RellenarCampos from '../components/modals/RellnarCampos';
import React from 'react'
import CrearAlumno from '../components/CrearAlumno'

function Alumnos() {

  return (
    <>
      <NavBarAdministracion/>
      <CrearAlumno/>
    </>
    )
}

export default Alumnos