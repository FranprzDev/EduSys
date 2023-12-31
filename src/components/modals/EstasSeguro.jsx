import {
  UilExclamationTriangle,
  UilTimes,
  UilCheckCircle,
} from "@iconscout/react-unicons";

function EstasSeguro({ onAccept, onClose }) {
  return (
    <>
      <div className="modal" style={{ display: 'block' }} tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <h4 className="text-center mt-3">
              <UilExclamationTriangle className="ms-2" />
              <span> </span>
              <span className="text-danger">ATENCIÓN</span>
              <UilExclamationTriangle className="ms-2" />
            </h4>
            <div className="modal-body container">
              <div className="row">
                <div className="col d-flex justify-content-center align-items-center">
                  <p className="text-dark fs-5">
                    ¿Estás seguro que deseas realizar esta acción?
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn text-white rounded-4"
                style={{ background: "#4d3147 " }}
                onClick={onClose}
              >
                No, Cerrar <UilTimes className="ms-2" />
              </button>
              <button
                type="button"
                className="btn text-white rounded-4"
                style={{ background: "#4d3147 " }}
                onClick={onAccept}
              >
                Si, Eliminar <UilCheckCircle className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EstasSeguro;
