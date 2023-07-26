import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { UilTimes } from '@iconscout/react-unicons'
import Admin from '../../assets/images/suit-contact-modal.jpeg'

function ContactanosModal({ show, handleClose }) {
    return (
        <>
            {(show) && (
                <div className="modal " style={{ display: 'block' }} tabIndex="-1" >
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="col-md-8 col-lg-6 mx-auto">
                                    <figure className='w-75 h-100 rounded-circle mx-auto overflow-hidden'
                                        style={{
                                            background: '#c9b7c7',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',

                                        }}>
                                        <img className='img-fluid'
                                            src={Admin}
                                            alt="Imagen del usuario"
                                            style={{
                                                width: '90%',
                                            }}
                                        />
                                    </figure>
                                </div>
                                <h4 className="text-center m-3 col-lg-8 mx-auto">¡Tu mensaje fue enviado correctamente!</h4>
                                <p className='text-center col-6 mx-auto'>En breve nos concataremos por mail.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn text-white rounded-4" style={{ background: "#4d3147 " }} onClick={handleClose}>Cerrar <UilTimes className="ms-2" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ContactanosModal