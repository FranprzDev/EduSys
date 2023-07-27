import React, { useState, useContext, useEffect } from "react";
import JwtContext from "./JwtContext";
import girl from "../assets/images/girl-cute-iniciar-sesion.jpg";
import { UilArrowRight } from "@iconscout/react-unicons";
import DatosIncorrectos from "./modals/DatosIncorrectos";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
// funciona , pero tengo que usar context-api para que sea mejor.

function LoginPage() {
  const { setJwt } = useContext(JwtContext);

  const [mail, setMail] = useState("");
  const navigate = useNavigate();
  const [contrasenia, setContrasenia] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Lógica para los modales
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // Lo usaremos después para dar lógica a los componentes según verificaciones.
  // const isEmailMaxLengthReached = mail.length === 40;


  const handleLogin = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      "mail": mail,
      "contrasenia": contrasenia
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
  
    try {
      const response = await fetch("http://localhost:8000/auth/login", requestOptions);

      // console.log(response)
      if(response.status >= 400){
        throw new Error("test")
      }

      const result = await response.json();
      // console.log(result)

      const decodedToken = await jwtDecode(result.access_token);
      // console.log(decodedToken)

      setJwt({
        mail: decodedToken.mail,
        token: result.access_token,
        // agregar mas datos después
      });

      localStorage.setItem("token", result.access_token);

      navigate("/auth/")


      // if(response.status == 200){
      //   const result = await response.text();

      //   const decodedToken = await jwtDecode(result);
        
        
      //   setJwt({
      //     ...jwt,
      //     email: decodedToken.email,
      //     jwt: result,
      //   });
      //   localStorage.setItem("token", jwt);
  
      //   window.location.href = "/administracion"
      // }else{
      //   setShow(true);
      //   const mensajeServidor = JSON.parse(error)["message"];
      //   setErrorMessage(mensajeServidor ?? "activamelopapá");
      // }
      }
    catch (error) {
      // setShow(true);
      // setErrorMessage(error ?? "activamelopapá");

      setShow(true);
      const mensajeServidor = JSON.parse(error)["message"];
      setErrorMessage(mensajeServidor ?? "activamelopapá");
      }
  }
  

  return (
    <>
      <div className="container ">
        <div className="row justify-content-end">
          <div className="col-sm-5">
            <figure
              className="w-65 h-100 rounded-circle mx-auto overflow-hidden"
              style={{
                background: "#c9b7c7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                className="img-fluid"
                src={girl}
                alt="Imagen del usuario"
                style={{
                  width: "70%",
                  borderRadius: "50%",
                }}
              />
            </figure>
          </div>
          <div className="col-md-6">
            <div className="form">
              <h2
                className=" text-center"
                style={{
                  color: "#c9b7c7",
                }}
              >
                Iniciar Sesión
              </h2>

              <div className="card-body">
                <form id="login-form" method="POST" onSubmit={handleLogin}>
                  <div className="mb-3 mx-3">
                    <label htmlFor="email" className="label-custom">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control input-custom rounded-pill textarea"
                      id="email"
                      name="email"
                      placeholder="nombre@ejemplo.com"
                      required

                      value={mail}
                      onChange={(e) => {setMail(e.target.value);}}
                      maxLength={40}
                      style={{
                        background: "#c9b7c7",
                        boxShadow: "inset 0 2px 3px #4d3147",
                        border: mail.length >= 40 ? "2px solid red" : undefined,
                      }}
                    />
                    {
                      mail.length == 40 && (
                        <p className="text-danger">La cantidad máxima de caracteres es 40</p>
                      ) 
                    } 
                  </div>
                  <div className="mb-3 mx-3">
                    <label htmlFor="password" className="label-custom">
                      Contraseña                   
                    </label>
                    <input
                      type="password"
                      className="form-control input-custom rounded-pill"
                      id="password"
                      name="password"
                      placeholder="Contraseña"
                      required
                      style={{
                        background: "#c9b7c7",
                        boxShadow: "inset 0 2px 3px #4d3147",
                      }}
                      value={contrasenia}
                      onChange={(e) => setContrasenia(e.target.value)}
                    />
                  </div>
                  <div className="form-check justify-content-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                    />
                    <label className="form-check-label" htmlFor="gridCheck1">
                      Acepto los términos y condiciones
                    </label>
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-secondary btn-custom my-2 rounded-4"
                      type="submit"
                      id="submit-button"
                      style={{ background: "#4d3147 " }}
                    >
                      Iniciar Sesión
                      <UilArrowRight size="30" color="#C9B7C7" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DatosIncorrectos show={show} handleClose={handleClose} message={errorMessage}/>
    </>
  );
}

export default LoginPage;
