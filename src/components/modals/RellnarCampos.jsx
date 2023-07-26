import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { UilExclamationTriangle , UilTimes } from '@iconscout/react-unicons'
import AngryRabbit from '../../assets/images/angry-rabbit.jpg'


function RellenarCampos({ show, handleClose }) {
  return (
    <>
      {(show) && (
        <div className="modal" style={{ display: 'block' }} tabIndex="-1" >
          <div className="modal-dialog">
            <div className="modal-content">
              <h4 className="text-center mt-3">
                <UilExclamationTriangle className="ms-2"/> 
                 <span> </span><bold className="text-danger">ERROR</bold> 
                <UilExclamationTriangle className="ms-2"/>
              </h4>
              <div className="modal-body container">
                <div className="row">
                  <div className="col-6 d-flex justify-content-center">
                  <figure className='w-75 h-100 rounded-circle mx-auto overflow-hidden'
                        style={{
                            background: '#c9b7c7',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                          <img src={AngryRabbit} alt="Angry rabbit for a issue in your form"/>
                    </figure>
                    
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <p className='text-dark fs-5'><bold>Debes completar todos los formularios.</bold></p>
                  </div>
                </div>
                
              </div>

              <div className="modal-footer">
                <button type="button" className="btn text-white rounded-4" style={{ background: "#4d3147 " }} onClick={handleClose}>Cerrar <UilTimes className="ms-2"/></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RellenarCampos