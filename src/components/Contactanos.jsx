import "bootstrap/dist/css/bootstrap.css";
import ContactanosModal from "./modals/ContactanosModal";
import { UilArrowRight } from "@iconscout/react-unicons";
import { useState } from "react";
import { validarLetrasEspacios } from "../utils/validaciones";


function Contactanos() {
  const [show, setShow] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault()

    setEmail("")
    setNombre("")
    setMensaje("")
    
    setShow(true)
  };

  return (
    <>
      <div className="container row mx-auto flex-md-row-reverse">
        <div className="col-lg-6 d-flex justify-content-center align-items-center mt-3 mt-lg-0">
          <div className="text-center">
            <h2 style={{ color: "#866a80" }}>Contáctanos</h2>
            <p style={{ color: "#4d3147" }}>Si necesitas ayuda puedes</p>
            <p style={{ color: "#4d3147" }}>contactar al equipo de</p>
            <p style={{ color: "#4d3147" }}>SysSolutions</p>
          </div>
        </div>
        <div className="col-lg-6 py-3">
          <form action="" onSubmit={handleSubmit}>
            <div className="col-md-8 mx-auto">
              <input
                type="text"
                className="form-control rounded-4"
                placeholder="Nombre y Apellido"
                value={nombre}
                onChange={(e) => {
                  if(validarLetrasEspacios(e.target.value)){
                    setNombre(e.target.value)
                  }
                }}
                maxLength={40}
                pattern="^[a-zA-Z\s]*$"
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
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                maxLength={40}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  background: "#c9b7c7",
                  boxShadow: "inset 0 2px 3px #4d3147",
                }}
                required
              />
            </div>
            <div className="col-md-8 col-lg-12 mx-auto">
              <textarea
                className="form-control rounded-4 h-100"
                placeholder="Escribe un mensaje"
                value={mensaje}
                maxLength={200}
                onChange={(e) => {
                  setMensaje(e.target.value);
                }}
                style={{
                  background: "#c9b7c7 ",
                  boxShadow: "inset 0 2px 3px #4d3147",
                }}
                rows="4"
                required
              ></textarea>
            </div>
            <div className="text-center mt-3">
              <button
                className="col-4 btn text-white rounded-4 "
                style={{ background: "#4d3147 " }}
              >
                Enviar <UilArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>

      <ContactanosModal show={show} handleClose={handleClose} />
    </>
  );
}

export default Contactanos;
