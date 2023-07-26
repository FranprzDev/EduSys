import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { UilTimes } from "@iconscout/react-unicons";

function DatosIncorrectos({ showPass, handleClosePass }) {
  return (
    <>
      {showPass && (
        <div className="modal" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <h4 className="text-center mt-3">¡Estás enviando {} Mal!</h4>

              <div className="modal-body">
                <figure
                  className="w-75 h-100 rounded-circle mx-auto overflow-hidden"
                  style={{
                    background: "#c9b7c7",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <UilTimes className="ms-2" />
                </figure>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn text-white rounded-4"
                  style={{ background: "#4d3147 " }}
                  onClick={handleClosePass}
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

export default DatosIncorrectos;
