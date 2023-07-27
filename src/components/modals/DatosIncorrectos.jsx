import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { UilExclamationTriangle , UilTimes } from '@iconscout/react-unicons'
import AngryRabbit from '../../assets/images/angry-rabbit.jpg'

function DatosIncorrectos({ show, handleClose, message }) {
  const defaultText = {
    patterns: [
      "8 caracteres",
      "1 mayúscula",
      "1 caracter especial",
      "1 número"
    ]
  };
  return (
    <>
      {show && (
        <div className="modal" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <h4 className="text-center mt-3">
                <UilExclamationTriangle className="ms-2" />
                <span> </span>
                <span className="text-danger">ERROR</span>
                <UilExclamationTriangle className="ms-2" />
              </h4>
              <div className="modal-body container">
                <div className="row">
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <figure
                      className="w-50 h-50 rounded-circle mx-auto overflow-hidden"
                      style={{
                        background: "#c9b7c7",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={AngryRabbit}
                        alt="Angry rabbit for a issue in your form"
                      />
                    </figure>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <p className="text-dark fs-5">
                      {message === "activamelopapá" ? (
                        <div>
                          <h3>
                            Debes enviar una contraseña que cumpla con los
                            siguientes patrones:
                          </h3>
                          <ul>
                            {defaultText.patterns.map((pattern, index) => (
                              <li key={index}>{pattern}</li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <strong>{message}</strong>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn text-white rounded-4"
                  style={{ background: "#4d3147 " }}
                  onClick={handleClose}
                >
                  Cerrar <UilTimes className="ms-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DatosIncorrectos