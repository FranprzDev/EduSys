import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { UilDatabase, UilTimes, UilUpload } from "@iconscout/react-unicons";
import { useContext } from "react";
import { JwtContext } from "../../context/JwtContext";

function ActualizarDatos({
  onCloseModal = () => undefined,
  onSubmit = () => undefined,
  adminCommonData = { celular: '', mail: '', direccion: '' }, // Lo dejamos por el momento a este
  onChangeAdminData = (prop, value) => undefined,
}) {

  const { jwt } = useContext(JwtContext);
  return (
    <>
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <h4 className="text-center mt-3">
              <strong>Actualizar Datos Básicos</strong> <UilDatabase />
            </h4>

            <div className="modal-body">
              <form>
                <section className="text-center">
                  <input
                    type="number"
                    className="form-control rounded-4 my-3"
                    minLength={7}
                    maxLength={8}
                    min={0}
                    defaultValue={jwt.celular}
                    placeholder="Ingrese un nuevo celular"
                    name="celular"
                    onChange={({ target: { value, name } }) => onChangeAdminData(name, value)}
                    style={{
                      background: "#c9b7c7",
                      boxShadow: "inset 0 2px 3px #4d3147",
                    }}
                    required
                  />
                  <input
                    type="email"
                    className="form-control rounded-4 my-3"
                    placeholder="Ingrese un nuevo mail"
                    minLength={3}
                    maxLength={40}
                    name="mail"
                    defaultValue={jwt.email}
                    onChange={({ target: { value, name } }) => onChangeAdminData(name, value)}
                    style={{
                      background: "#c9b7c7",
                      boxShadow: "inset 0 2px 3px #4d3147",
                    }}
                    required
                  />
                  <input
                    type="text"
                    className="form-control rounded-4 my-3"
                    placeholder="Ingrese una nueva dirección"
                    minLength={6}
                    maxLength={70}
                    name="direccion"
                    defaultValue={jwt.direccion}
                    onChange={({ target: { value, name } }) => onChangeAdminData(name, value)}
                    style={{
                      background: "#c9b7c7",
                      boxShadow: "inset 0 2px 3px #4d3147",
                    }}
                    required
                  />

                  <button
                    type="submit"
                    className="btn text-white rounded-4"
                    style={{ background: "#4d3147 " }}
                    onClick={onSubmit}
                  >
                    Guardar Cambios <UilUpload className="ms-2" />
                  </button>
                </section>
              </form>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ActualizarDatos;
