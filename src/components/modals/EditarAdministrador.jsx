import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { UilTimes, UilUpload } from "@iconscout/react-unicons";

function EditarAdministrador({
  onCloseModal = undefined,
  onSubmit = undefined,
  adminData = undefined,
}) {
  const [nombre, setNombre] = useState(adminData?.nombre || "");
  const [apellido, setApellido] = useState(adminData?.apellido || "");
  const [dni, setDni] = useState(adminData?.dni || "");

  // Función para manejar el envío del formulario
  const handleFormSubmit = () => {
    console.log(nombre)
    console.log(apellido)
    console.log(dni)
    // uso el spreadoperator para ir trayendome lo que ya tenia
    const updatedAdminData = {
      ...adminData,
      nombre: nombre == undefined ? adminData.nombre : nombre,
      apellido: apellido == undefined ? adminData.apellido : apellido,
      dni: dni == undefined ? adminData.dni : dni,
    };


    console.log(updatedAdminData)
    onSubmit(updatedAdminData);
  };

  return (
    <>
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <h4 className="text-center mt-3">Actualizar Contraseña</h4>
            <h5 className="text-center custom-violet-second-color">{adminData.nombre} {adminData.apellido}</h5>
            <div className="modal-body">
            <p className="custom-violet-first-color text-center">
              Si no quieres actualizar algún elemento, entonces simplemente dejalo como está.
            </p>
            <input
                type="text"
                className="form-control rounded-4 my-3"
                placeholder="Ingres un nuevo nombre"
                defaultValue={adminData.nombre} 
                onChange={(e) => setNombre(e.target.value)}
                style={{
                  background: "#c9b7c7",
                  boxShadow: "inset 0 2px 3px #4d3147",
                }}
                required
              />

            <input
                type="text"
                className="form-control rounded-4 my-3"
                placeholder="Ingres un nuevo apellido"
                defaultValue={adminData.apellido} 
                onChange={(e) => setApellido(e.target.value)}
                style={{
                  background: "#c9b7c7",
                  boxShadow: "inset 0 2px 3px #4d3147",
                }}
                required
              />

            <input
                type="text"
                className="form-control rounded-4 my-3"
                placeholder="Ingres un nuevo DNI"
                defaultValue={adminData.dni} 
                onChange={(e) => setDni(e.target.value)}
                style={{
                  background: "#c9b7c7",
                  boxShadow: "inset 0 2px 3px #4d3147",
                }}
                required
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn text-white rounded-4"
                style={{ background: "#4d3147 " }}
                onClick={onCloseModal}
              >
                Cerrar <UilTimes className="ms-2" />
              </button>
              <button
                type="button"
                className="btn text-white rounded-4"
                style={{ background: "#4d3147 " }}
                onClick={handleFormSubmit}
              >
                Guardar Cambios <UilUpload className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditarAdministrador;
