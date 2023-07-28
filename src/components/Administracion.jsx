// Importaciones
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

// -> Importaciones de UI
import confetti from "canvas-confetti";
import Conejo from "../assets/images/Admin-Conejo.png";
import { UilCog, UilUserSquare, UilEdit } from "@iconscout/react-unicons";
import ActualizarDatos from "./modals/ActualizarDatos";
import ActualizarContraseña from "./modals/ActualizarContraseña";

// Import de Animaciones
import { JackInTheBox } from "react-awesome-reveal";
import { JwtContext } from "../context/JwtContext";

function Administracion() {
  const { jwt } = useContext(JwtContext)
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleClosePass = () => setShowPass(false);
  const handleShowPass = () => setShowPass(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    confetti();
    // modal de iniciaste sesion como {TIPO-DE-ADMIN}
  }, []);
  return (
    <>
      <JackInTheBox delay={200}>
        <div className="container row mx-auto py-lg-5 ">
          <div className="col-lg-6 my-4 my-lg-0">
            <figure
              className="w-75 h-100 rounded-circle mx-auto overflow-hidden"
              style={{
                background: "#c9b7c7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                className="img-fluid"
                src={Conejo}
                alt="Imagen del usuario"
                style={{
                  width: "90%",
                }}
              />
            </figure>
          </div>
          <div className="col-lg-6 ">
            <div className="col-12">
              {jwt.email === "admin@gmail.com" ? (
                <>
                  <h2 className="text-center">Hola Super {jwt.nombre} {jwt.apellido}</h2>
                  <h5 className="text-warning">¡Estás en una cuenta de Super Administrador!</h5>
                </>
              ) : (
                <>
                  <h2 className="text-center">Hola {jwt.nombre} {jwt.apellido}</h2>
                  <div className="col-md-8 mx-auto">
                    <p>DNI: {jwt.dni}</p>
                    <p>Direccion: {jwt.direccion}</p>
                    <p>Celular: {jwt.celular}</p>
                    <p>Mail: {jwt.email}</p>
                  </div>
                </>
              )}
            </div>
            <div className="col-md-6 col-lg-8 mx-auto">
              <button
                className="col-12 btn text-white rounded-4 "
                onClick={handleShow}
                style={{ background: "#4d3147 " }}
              >
                Actualizar Datos <UilCog />{" "}
              </button>
              <button
                className="col-12 btn text-white rounded-4 my-3"
                onClick={handleShowPass}
                style={{ background: "#4d3147 " }}
              >
                Cambiar Contraseña <UilEdit />
              </button>
              <button
                className="col-12 btn text-white rounded-4 "
                style={{ background: "#4d3147 " }}
                onClick={(e) => {
                  navigate("/auth/alumnos");
                }}
              >
                Pagina de Alumnos <UilUserSquare />
              </button>
            </div>
          </div>
        </div>
      </JackInTheBox>
      <ActualizarDatos show={show} handleClose={handleClose} />
      <ActualizarContraseña
        showPass={showPass}
        handleClosePass={handleClosePass}
      />
    </>
  );
}

export default Administracion;
