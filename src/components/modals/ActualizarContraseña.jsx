import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { UilTimes, UilUpload } from "@iconscout/react-unicons";

function ActualizarContraseña({
  onCloseModal = () => undefined,
  onSubmit = () => undefined,
  adminPasswordData = { pass: "", retryPass: "" },
  onChangeAdminData = (prop, value) => undefined,
}) {

  return (
    <>
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <h4 className="text-center mt-3">Actualizar Contraseña </h4>

            <div className="modal-body">
              <input
                type="password"
                name="pass"
                onChange={({ target: { value, name } }) => onChangeAdminData(name, value)}
                className="form-control rounded-4 "
                placeholder="Nueva Contraseña"
                style={{
                  background: "#c9b7c7",
                  boxShadow: "inset 0 2px 3px #4d3147",
                }}
                required
              />
              <input
                type="password"
                name="retryPass"
                onChange={({ target: { value, name } }) => onChangeAdminData(name, value)}
                className="form-control rounded-4 mt-3"
                placeholder="Repita Nueva Contraseña"
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
                onClick={() => { 
                  onSubmit()
                }}
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

export default ActualizarContraseña;
