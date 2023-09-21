import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { UilDatabase, UilTimes, UilUpload } from "@iconscout/react-unicons";
import {
  verificarContrasenia,
  verificarDatos,
  verificarMail,
  esLetra,
  esNumero,
} from "../../utils/validaciones";

function CrearAdmin({
  show,
  handleClose,
  message,
  admin = undefined,
  createAdmin = undefined,
}) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [celular, setCelular] = useState("");
  const [mail, setMail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const handleSubmit = (e) => {
    admin = {
      nombre,
      apellido,
      dni,
      celular,
      mail,
      direccion,
      contrasenia,
    };

    e.preventDefault();
    setNombre("");
    setApellido("");
    setDni("");
    setCelular("");
    setMail("");
    setDireccion("");
    setContrasenia("");

    handleClose();
    createAdmin(admin);
  };

  return (
    <>
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <h4 className="text-center mt-3">
              <strong>{message}</strong> <UilDatabase />
            </h4>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <section className="text-center">
                  {message === "Crear Administrador" ? (
                    <>
                      <input
                        type="text"
                        className="form-control rounded-4 "
                        placeholder="Nombre"
                        value={nombre}
                        pattern="[a-zA-Z]+"
                        title="Solo se permiten letras (mayúsculas y minúsculas)"
                        minLength={3}
                        maxLength={25}
                        onChange={(e) => {
                          if (
                            e.target.value === "" ||
                            esLetra(e.target.value)
                          ) {
                            setNombre(e.target.value);
                          }
                        }}
                        style={{
                          background: "#c9b7c7",
                          boxShadow: "inset 0 2px 3px #4d3147",
                        }}
                        required
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {message === "Crear Administrador" ? (
                    <input
                      type="text"
                      className="form-control rounded-4 my-3"
                      placeholder="Apellido"
                      pattern="[a-zA-Z]+"
                      title="Solo se permiten letras (mayúsculas y minúsculas)"
                      value={apellido}
                      minLength={3}
                      maxLength={25}
                      onChange={(e) => {
                        if (e.target.value === "" || esLetra(e.target.value)) {
                          setApellido(e.target.value);
                        }
                      }}
                      style={{
                        background: "#c9b7c7",
                        boxShadow: "inset 0 2px 3px #4d3147",
                      }}
                      required
                    />
                  ) : (
                    <></>
                  )}
                  {message === "Crear Administrador" ? (
                    <input
                      type="number"
                      min="0"
                      className="form-control rounded-4 my-3"
                      placeholder="DNI"
                      minLength={7}
                      maxLength={8}
                      value={dni}
                      onChange={(e) => {
                        setDni(e.target.value);
                      }}
                      style={{
                        background: "#c9b7c7",
                        boxShadow: "inset 0 2px 3px #4d3147",
                      }}
                      required
                    />
                  ) : (
                    <></>
                  )}

                  <input
                    type="number"
                    className="form-control rounded-4 my-3"
                    placeholder="Celular"
                    minLength={7}
                    maxLength={8}
                    min={0}
                    value={celular}
                    onChange={(e) => {
                      if (e.target.value === "" || esNumero(e.target.value)) {
                        setCelular(e.target.value);
                      }
                    }}
                    style={{
                      background: "#c9b7c7",
                      boxShadow: "inset 0 2px 3px #4d3147",
                    }}
                    required
                  />
                  <input
                    type="email"
                    className="form-control rounded-4 my-3"
                    placeholder="Mail"
                    minLength={3}
                    maxLength={40}
                    value={mail}
                    onChange={(e) => {
                      setMail(e.target.value);
                    }}
                    style={{
                      background: "#c9b7c7",
                      boxShadow: "inset 0 2px 3px #4d3147",
                    }}
                    required
                  />
                  <input
                    type="text"
                    className="form-control rounded-4 my-3"
                    placeholder="Direccion"
                    minLength={6}
                    maxLength={70}
                    value={direccion}
                    onChange={(e) => {
                      setDireccion(e.target.value);
                    }}
                    style={{
                      background: "#c9b7c7",
                      boxShadow: "inset 0 2px 3px #4d3147",
                    }}
                    required
                  />
                  {message == "Crear Administrador" ? (
                    <>
                      <input
                        type="password"
                        className="form-control rounded-4 my-3"
                        placeholder="Contraseña"
                        minLength={8}
                        maxLength={40}
                        value={contrasenia}
                        onChange={(e) => {
                          setContrasenia(e.target.value);
                        }}
                        style={{
                          background: "#c9b7c7",
                          boxShadow: "inset 0 2px 3px #4d3147",
                        }}
                        required
                      />
                      <label
                        htmlFor="contrasenia"
                        className="text-danger mb-2 mt-0 pt-0"
                        style={{
                          fontSize: "17px",
                          position: "relative",
                          top: "-13px",
                        }}
                      >
                        El ingreso del número ya se considera el prefijo (381)
                      </label>
                      <label
                        htmlFor="contrasenia"
                        className="text-danger mb-2 mt-0 pt-0"
                        style={{
                          fontSize: "17px",
                          position: "relative",
                          top: "-13px",
                        }}
                      >
                        La contraseña debe tener como mínimo 8 caracteres,
                        conteniendo 1 mayúscula, 1 minúscula, 1 número y 1
                        carácter especial.
                      </label>
                    </>
                  ) : (
                    <></>
                  )}

                  <button
                    type="submit"
                    className="btn text-white rounded-4"
                    style={{ background: "#4d3147 " }}
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
                onClick={handleClose}
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
export default CrearAdmin;
