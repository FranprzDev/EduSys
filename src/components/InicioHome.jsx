import React from 'react'
import Conejo from '../assets/images/Admin-Conejo.png'
import { UilArrowRight } from '@iconscout/react-unicons'

function InicioHome() {
    return (
        <>
            <div className="container row mx-auto py-lg-5 flex-md-row-reverse " >
                <div className="col-lg-6 my-4 my-lg-0">
                    <figure className='w-75 h-100 rounded-circle mx-auto overflow-hidden'
                        style={{
                            background: '#c9b7c7',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                        <img className='img-fluid'
                            src={Conejo}
                            alt="Imagen del usuario"
                            style={{
                                width: '90%',
                            }}
                        />
                    </figure>

                </div>
                <div className="col-lg-6 mx-auto">
                    <div >
                        <h1 className='text-center' style={{ color: "#866a80" }}>EduSys</h1>                   
                        <p className='text-center col-6 mx-auto my-5'>Un lugar donde gestionar la información de tus estudiantes es mas fácil que nunca.</p>
                    <div className='text-center mt-3'>
                        <button className='col-md-4 btn text-white rounded-4 ' style={{ background: "#4d3147 " }}>Enviar <UilArrowRight/></button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InicioHome