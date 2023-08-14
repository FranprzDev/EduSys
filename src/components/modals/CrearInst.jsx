import React, { useContext, useEffect, useState } from "react";
import { JwtContext } from "../../context/JwtContext";
import { InstContext } from "../../context/InstitucionContext";
import { UilUpload } from "@iconscout/react-unicons";
import { API_URL } from "../../utils/constants";
import { ErrorContext } from "../../context/ErrorContext";
import { useNavigate } from "react-router-dom";

const CrearInst = () => {
  const { nombreInst, celularInst, mailInst, handleCreateInstitution } =
    useContext(InstContext);



  const [nombreTentativo, setNombreTentativo] = useState("");
  const [celularTentativo, setCelularTentativo] = useState("");
  const [mailTentativo, setMailTentativo] = useState("");
  
  return (
    (nombreInst === "" || celularInst === "" || mailInst === "") && (
      <>
        <div className="modal" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content text-center">
              <h2 className="text-center mt-3">Crear Institución</h2>
              <article className="fs-5 text-center d-flex justify-content-center align-items-center flex-column w-100">
                <p>
                  Para poder continuar y acceder a todas las funcionalides de
                  este Sitio, primero deberás crear la institución a la que
                  apuntes con el sistema.
                </p>
                <p>
                  Es totalmente
                  <span className="text-danger"> IMPORTANTE </span>
                  <span>
                    que lo hagas a conciencia, ya que solo se puede hacer una
                    vez.
                  </span>
                </p>
              </article>

              <div className="modal-body">
                <form onSubmit={(e) => {
                    e.preventDefault() 
                    handleCreateInstitution(nombreTentativo, celularTentativo, mailTentativo) 
                }}>
                  <input
                    type="text"
                    name="Nombre de la Institución"
                    onChange={(e) => {
                      setNombreTentativo(e.target.value);
                    }}
                    className="form-control rounded-4 "
                    placeholder="Nombre de la Institución"
                    style={{
                      background: "#c9b7c7",
                      boxShadow: "inset 0 2px 3px #4d3147",
                    }}
                    required
                    minLength={3}
                    maxLength={40}
                  />
                  <input
                    type="email"
                    name="Mail Institución"
                    onChange={(e) => {
                      setMailTentativo(e.target.value);
                    }}
                    className="form-control rounded-4 mt-3"
                    placeholder="Mail de Institución"
                    style={{
                      background: "#c9b7c7",
                      boxShadow: "inset 0 2px 3px #4d3147",
                    }}
                    minLength={5}
                    maxLength={40}
                    required
                  />
                  <input
                    type="number"
                    name="Celular"
                    onChange={(e) => {
                      setCelularTentativo(e.target.value);
                    }}
                    className="form-control rounded-4 mt-3"
                    placeholder="Celular"
                    minLength={7}
                    maxLength={8}
                    style={{
                      background: "#c9b7c7",
                      boxShadow: "inset 0 2px 3px #4d3147",
                    }}
                    required
                  />
                  <button
                    type="submit"
                    className="btn text-white rounded-4 my-2"
                    style={{ background: "#4d3147 " }}
                  >
                    Guardar Cambios <UilUpload className="ms-2" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default CrearInst;
