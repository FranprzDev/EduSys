import React ,{useState} from 'react'
import Conejo from '../assets/images/Admin-Conejo.png'
import { UilCog , UilUserSquare , UilEdit} from '@iconscout/react-unicons'
import ActualizarDatos from './modals/ActualizarDatos';

function Administracion() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="container row mx-auto py-lg-5 " >
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
                <div className="col-lg-6 ">
                        <div className="col-12">
                        <h2 className='text-center'>Hola $Nombre$ $apellidos$</h2>

                        </div>
                    <div className="col-md-8 mx-auto">
                        <p>Registrado el $dia$/$mes$/$año$</p>
                        <p>DNI: $ID$</p>
                        <p>Direccion:$Direccion$</p>
                        <p>Celular:$celu$</p>
                        <p>Mail:$mail$</p>
                    </div>
                    <div className="col-md-6 col-lg-8 mx-auto">
                        <button className='col-12 btn text-white rounded-4 ' onClick={handleShow} style={{ background: "#4d3147 " }}>Actualizar Datos <UilCog/> </button>
                        <button className='col-12 btn text-white rounded-4 my-3' style={{ background: "#4d3147 " }}>Cambiar Contraseña <UilEdit/></button>
                        <button className='col-12 btn text-white rounded-4 ' style={{ background: "#4d3147 " }}>Pagina de Alumnos <UilUserSquare/></button>
                    </div>
                </div>
            </div>
            <ActualizarDatos show={show} handleClose={handleClose}/>
        </>
    )
}

export default Administracion