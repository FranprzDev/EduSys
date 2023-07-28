import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { UilDatabase, UilTimes, UilUpload } from '@iconscout/react-unicons'

function ModalCrearAlumno({ showAlumnos, handleCloseAlumnos }) {
    return (
        <>
            {(showAlumnos) && (
                <div className="modal" style={{ display: 'block' }} tabIndex="-1" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <h4 className="text-center mt-3">Actualizar Datos <UilDatabase /></h4>

                            <div className="modal-body">
                                <input type="text" className="form-control rounded-4 " placeholder="Nombre" style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }} required />
                                <input type="text" className="form-control rounded-4 my-3" placeholder="Apellido" style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }} required />
                                <input type="number" className="form-control rounded-4 my-3" placeholder="Año de cursado" style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }} required />
                                {/* <div className="my-3">
                                    <label htmlFor="cuotaDia" className="form-label">¿Cuota al día?</label>
                                    <select id="cuotaDia" className="form-control" placeholder="¿Cuota al día?" style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }} required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div> */}
                                <div class="input-group mb-3">
                                    <span class="input-group-text" style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }}>¿Cuota al día?</span>
                                    <select className="form-select" style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }} required >
                                        <option selected> </option>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn text-white rounded-4" style={{ background: "#4d3147 " }} onClick={handleCloseAlumnos}>Cerrar <UilTimes className="ms-2" /></button>
                                <button type="button" className="btn text-white rounded-4" style={{ background: "#4d3147 " }} >Crear Alumno<UilUpload className="ms-2" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalCrearAlumno