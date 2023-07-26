import React from 'react'
import conejoAlumno from '../assets/images/Alumnos-Adentro-Admin-Conejo.jpg'
import { UilUserPlus } from '@iconscout/react-unicons'

function CrearAlumno() {
  return (
    <>
        <div className="container row mx-auto py-lg-5 flex-md-row-reverse " >
                <div className="col-lg-6 my-4 my-lg-0">
                    <figure className=' rounded-circle mx-auto overflow-hidden'
                        style={{
                            background: '#c9b7c7',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width : 'auto',

                        }}>
                        <img className='img-fluid'
                            src={conejoAlumno}
                            alt="Imagen del usuario"
                            style={{
                                width: '100%',
                            }}
                        />
                    </figure>

                </div>
                <div className="col-lg-6 mx-auto d-flex align-items-center">
                    <div className=''>
                        <h3 className='text-center' style={{ color: "#866a80" }}>¡Puedes crear los alumnos que necesites!</h3>                   
                        
                    <div className='text-center mt-3'>
                        <button className='col-md-4 btn text-white rounded-4 ' style={{ background: "#4d3147 " }}>Crear Alumno <UilUserPlus/></button>
                    </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default CrearAlumno