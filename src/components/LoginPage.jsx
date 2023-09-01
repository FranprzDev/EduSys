/* -> Importaciones Lógica */
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JwtContext from "../context/JwtContext";
// Importar funciones lógicas
import { verificarContrasenia, verificarMail } from "../utils/validaciones";

/* -> Importaciones para mejorar la UI */
import { UilArrowRight } from "@iconscout/react-unicons";
import girl from "../assets/images/girl-cute-iniciar-sesion.jpg";
import { API_URL } from "../utils/constants";
import { ErrorContext } from "../context/ErrorContext";
import jwtDecode from "jwt-decode";

function LoginPage() {
  const { jwt, setJwt } = useContext(JwtContext);
  const { openErrorModal } = useContext(ErrorContext);
  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  // Lógica para la válidación de Inputs
  const longMaximaInput = 40;
  const minLenghtPass = 8;
  const [error, setError] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt.token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      mail: mail,
      contrasenia: contrasenia,
    });


    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${API_URL}auth/login`, requestOptions);


      if (response.status >= 400) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      const result = await response.json();

      const decodedToken = await jwtDecode(result.access_token);

      setJwt({
        id: decodedToken.id,
        token: result.access_token,
        nombre: decodedToken.nombre,
        apellido: decodedToken.apellido,
        direccion: decodedToken.direccion,
        dni: decodedToken.dni,
        celular: decodedToken.celular,
        email: decodedToken.mail,
        // agregar mas datos después
      });

      localStorage.setItem("token", result.access_token);

      navigate("/auth/");
    } catch (error) {
      openErrorModal(error.message);
    }
  };

  // -> Lógica de Checkeo de tener el JWT para estar logeado.
  // useEffect(() => {
  //   // Verificar si ya hay un token en el almacenamiento local
  //   const storedToken = localStorage.getItem("token");

  //   if (storedToken) {
  //     // Decodificar el token para obtener información relevante
  //     const decodedToken = jwtDecode(storedToken);

  //     // Verificar si el token es válido y no ha expirado
  //     const tokenExpiration = decodedToken.exp * 1000; // Convertir la fecha de expiración del token a milisegundos
  //     const currentTime = Date.now();

  //     if (tokenExpiration > currentTime) {
  //       // // El token es válido y no ha expirado, por lo tanto, el usuario ya está autenticado
  //       // setJwt({
  //       //   id: decodedToken.id,
  //       //   nombre: decodedToken.nombre,
  //       //   apellido: decodedToken.apellido,
  //       //   direccion: decodedToken.direccion,
  //       //   dni: decodedToken.dni,
  //       //   celular: decodedToken.celular,
  //       //   email: decodedToken.mail,
  //       //   token: storedToken,
  //       // });

  //       // Redirigir a la página de administración
  //       console.log("------------->")
  //       navigate("/auth/");
  //     }
  //   }
  // }, [setJwt, navigate]);

  return (
    <>
      <div className="flex-container h-100">
        <div className="row justify-content-center">
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
                  width: "80%",
                  borderRadius: "50%",
                }}
              />
            </figure>
          </div>
          <div className="col-md-6 d-flex align-items-center w-50 justify-content-center">
            <div className="form w-100">
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
                      onChange={(e) => {
                        
                        if (
                          verificarMail(mail)
                        ) {
                          setError(false);
                        } else {
                          setError(true);
                        }
                        setMail(e.target.value);
                      }}
                      maxLength={longMaximaInput}
                      style={{
                        background: "#c9b7c7",
                        boxShadow: "inset 0 2px 3px #4d3147",
                        border: !error ? "2px solid red" : "none",
                      }}
                    />
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
                      minLength={minLenghtPass}
                      maxLength={longMaximaInput}
                      required
                      style={{
                        background: "#c9b7c7",
                        boxShadow: "inset 0 2px 3px #4d3147",
                        border: !error ? "2px solid red" : "none",
                      }}
                      value={contrasenia}
                      onChange={(e) => {
                        
                        if (
                          verificarContrasenia(contrasenia)
                        ) {
                          setError(false);
                        } else {
                          setError(true);
                        }
                        setContrasenia(e.target.value);
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-secondary btn-custom my-2 rounded-4"
                      type="submit"
                      id="submit-button"
                      style={{ background: "#4d3147 " }}
                      disabled={!error}
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
    </>
  );
}

export default LoginPage;
