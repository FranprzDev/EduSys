import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { UilDatabase, UilTimes, UilUpload } from "@iconscout/react-unicons";
import {
  verificarContrasenia,
  verificarDatos,
  verificarMail,
} from "../../utils/validaciones";

function ActualizarDatos({
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

  const [arrayErrors, setArrayErrors] = useState([]);

  useEffect(() => {
    const errores = [];
    const erroresMail = verificarMail(mail);
    const erroresContrasenia = verificarContrasenia(contrasenia);
    const erroresDatos = verificarDatos(
      nombre,
      apellido,
      dni,
      celular,
      direccion
    );

    if (erroresMail) errores.push(erroresMail);
    if (erroresContrasenia) errores.push(erroresContrasenia);
    if (erroresDatos) errores.push(erroresDatos);

    setArrayErrors(errores);
  }, [contrasenia, mail, nombre, apellido, dni, celular, direccion]);

  const handleSubmit = (e) => {
    if (arrayErrors.length === 0) {
      admin = {
        nombre,
        apellido,
        dni,
        celular,
        mail,
        direccion,
        contrasenia,
      }};

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
    }

    return (
      <>
        {show && (
          <div className="modal" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <h4 className="text-center mt-3">
                  <strong>{message}</strong> <UilDatabase />
                </h4>

                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <section className="text-center">
                      {message !== "Crear Categoria" ? (
                        <input
                          type="text"
                          className="form-control rounded-4 "
                          placeholder="Nombre"
                          value={nombre}
                          onChange={(e) => {
                            setNombre(e.target.value);
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
                      {message !== "Crear Categoria" ? (
                        <input
                          type="text"
                          className="form-control rounded-4 my-3"
                          placeholder="Apellido"
                          value={apellido}
                          onChange={(e) => {
                            setApellido(e.target.value);
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
                      {message !== "Crear Categoria" ? (
                        <input
                          type="number"
                          min="0"
                          className="form-control rounded-4 my-3"
                          placeholder="DNI"
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
                        min={0}
                        value={celular}
                        onChange={(e) => {
                          setCelular(e.target.value);
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
                        placeholder="Email"
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
                        <input
                          type="password"
                          className="form-control rounded-4 my-3"
                          placeholder="Contraseña"
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
                      ) : (
                        <></>
                      )}

                      {arrayErrors.map((text, index) => (
                        <p key={index} className="text-danger">
                          {text}
                        </p>
                      ))}

                      <button
                        type="submit"
                        className="btn text-white rounded-4"
                        style={{ background: "#4d3147 " }}
                        disabled={arrayErrors.length === 0 ? true : false}
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
        )}
      </>
    );
  };
export default ActualizarDatos;