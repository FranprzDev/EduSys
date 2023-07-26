import React from 'react'
import { UilFolderOpen, UilUser, UilTrashAlt } from '@iconscout/react-unicons'

function TablaCrearAlumno() {
  return (
    <>
    <div className="container table-responsive">
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Año de Cursado</th>
      <th scope="col">Cuota</th>
      <th scope="col">Opciones</th>
    </tr>
  </thead>
  <tbody >
    <tr >
      <td className='text-white'style={{ background: "#866A80 " }}></td>
      <td className='text-white'style={{ background: "#866A80 " }}></td>
      <td className='text-white'style={{ background: "#866A80 " }}></td>
      <td className='text-white'style={{ background: "#866A80 " }}></td>
      <td className='text-white text-center'style={{ background: "#866A80 " }}><UilFolderOpen/><UilUser className="mx-3"/><UilTrashAlt/></td>
    </tr>
    
  </tbody>
</table>
    </div>
    </>
  )
}

export default TablaCrearAlumno