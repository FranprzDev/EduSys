import React from 'react'
import { UilFolderOpen, UilUser, UilTrashAlt, UilTimesCircle, UilCheckCircle } from '@iconscout/react-unicons'
import { useState } from 'react'

const Alumnos = [
  {nombre: "Eduardo", apellido:"Trigo", anio_cursado:2022, cuota:true},
  {nombre: "Hector", apellido:"Estrada", anio_cursado:2019, cuota:false},
  {nombre: "Eduardo", apellido:"Trigo", anio_cursado:2022, cuota:true}
]

function TablaCrearAlumno() {
  const [assets, setAssets] = useState(Alumnos)

  return (
    <>
    <div className="container table-responsive">
    <table className="table">
  <thead>
    <tr className='text-center'>
      <th scope="col" className='col'>Nombre</th>
      <th scope="col" className='col'>Apellido</th>
      <th scope="col" className='col-2'>Año de Cursado</th>
      <th scope="col" className='col-1'>Cuota</th>
      <th scope="col" className='col-2'>Opciones</th>
    </tr>
  </thead>
  <tbody >
    {
      assets.map((item, index) => (
        <tr key={index}>
          <td className='text-white'style={{ background: "#866A80 " }}>{item.nombre}</td>
          <td className='text-white'style={{ background: "#866A80 " }}>{item.apellido}</td>
          <td className='text-white'style={{ background: "#866A80 " }}>{item.anio_cursado}</td>
          <td className='text-white text-center'style={{ background: "#866A80 " }}>
            {
            item.cuota ? <><UilTimesCircle/></> : <><UilCheckCircle/></>
            }
          </td>
          <td style={{ background: "#866A80 " }} className='text-white text-center'>
            <a className='text-white text-center' href=""><UilFolderOpen/></a>
            <a className='text-white text-center' href=""><UilUser className="mx-lg-3"/></a>
            <a className='text-white text-center' href=""><UilTrashAlt/></a>
          </td>
        </tr>
      ))
    }
    
  </tbody>
</table>
    </div>
    </>
  )
}

export default TablaCrearAlumno