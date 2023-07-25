import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { UilDatabase , UilTimes , UilUpload } from '@iconscout/react-unicons'

function ActualizarDatos({ show, handleClose }) {
  return (
    <>
      {(show) && (
        <div className="modal" style={{ display: 'block' }} tabIndex="-1" >
          <div className="modal-dialog">
            <div className="modal-content">
              <h4 className="text-center mt-3">Actualizar Datos <UilDatabase/></h4>
              
              <div className="modal-body">
                <input type="text" className="form-control rounded-4 " placeholder="Nombre" style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }} required />
                <input type="text" className="form-control rounded-4 my-3" placeholder="Apellido" style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }} required />
                <input type="number" className="form-control rounded-4 my-3" placeholder="DNI" style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }} required />
                <input type="number" className="form-control rounded-4 my-3" placeholder="Celular" style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }} required />
                <input type="email" className="form-control rounded-4 " placeholder="Email" style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }} required />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn text-white rounded-4" style={{ background: "#4d3147 " }} onClick={handleClose}>Cerrar <UilTimes className="ms-2"/></button>
                <button type="button" className="btn text-white rounded-4" style={{ background: "#4d3147 " }}>Save changes <UilUpload className="ms-2"/></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ActualizarDatos