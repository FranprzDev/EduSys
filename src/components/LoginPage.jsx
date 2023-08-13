/* -> Importaciones Lógica */
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JwtContext from "../context/JwtContext";
import jwtDecode from "jwt-decode";

// Importar funciones lógicas
import { verificarContrasenia, verificarMail } from "../utils/validaciones";

/* -> Importaciones para mejorar la UI */
import { UilArrowRight } from "@iconscout/react-unicons";
import girl from "../assets/images/girl-cute-iniciar-sesion.jpg";
import { API_URL } from "../utils/constants";
import { ErrorContext } from "../context/ErrorContext";

function LoginPage() {
  const { setJwt } = useContext(JwtContext);
  const { openErrorModal } = useContext(ErrorContext);
  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  // Lógica para la válidación de Inputs
  const longMaximaInput = 40;
  const minLenghtPass = 8;
  const [arrayError, setArrayError] = useState([])
  const [arrayErrorMail, setArrayErrorMail] = useState([])

  // Estos use-effects hacen que se rendericen los errores en tiempo real.
  useEffect(() => {
    const errors = verificarContrasenia(contrasenia);

    if (contrasenia.length >= longMaximaInput) {
      errors.push(`La contraseña debe tener como máximo ${longMaximaInput} caracteres.`);
    }

    setArrayError(errors);
  }, [contrasenia]);

  useEffect(() => {
    const errors = verificarMail(mail);
    setArrayErrorMail(errors);
  }, [mail]);
  
  // Logica para el boton
  const disableSubmit = arrayError.length !== 0 || arrayErrorMail.length !== 0;

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
      const response = await fetch(`${API_URL}auth/login`, requestOptions);

      if(response.status >= 400){
        const errorBody = await response.json(); // hay que hacer un await por que el response también viene en async!
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

      navigate("/auth/")
      }
    catch (error) {
      openErrorModal(error.message)
    }
  }
  
  // -> Lógica de Checkeo de tener el JWT para estar logeado.
  useEffect(() => {
    // Verificar si ya hay un token en el almacenamiento local
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      // Decodificar el token para obtener información relevante
      const decodedToken = jwtDecode(storedToken);

      // Verificar si el token es válido y no ha expirado
      const tokenExpiration = decodedToken.exp * 1000; // Convertir la fecha de expiración del token a milisegundos
      const currentTime = Date.now();

      if (tokenExpiration > currentTime) {
        // El token es válido y no ha expirado, por lo tanto, el usuario ya está autenticado
        setJwt({
          mail: decodedToken.mail,
          token: storedToken,
          // agregar mas datos después
        });

        // Redirigir a la página de administración
        navigate("/auth/");
      }
    }
  }, [setJwt, navigate]);

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
                  width: "80%",
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
                      onChange={(e) => {
                        setMail(e.target.value);
                      }}
                      maxLength={longMaximaInput}
                      style={{
                        background: "#c9b7c7",
                        boxShadow: "inset 0 2px 3px #4d3147",
                        border: mail.length === longMaximaInput ? "2px solid red" : undefined,
                      }}
                    />
                    {arrayErrorMail.map((error, index) => (
                      <p key={index} className="text-danger">
                        {error}
                      </p>
                    ))}
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
                        border: arrayError.length !== 0 ? "2px solid red" : undefined
                      }}
                      value={contrasenia}
                      onChange={(e) => setContrasenia(e.target.value)}
                    />
                    {arrayError.map((error, index) => (
                      <p key={index} className="text-danger">
                        {error}
                      </p>
                    ))}
                  </div>
                  <div className="form-check justify-content-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                      required
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
                      disabled={disableSubmit}
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
