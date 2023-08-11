import { useContext, useState, useEffect } from "react";
import conejoAlumno from "../assets/images/Alumnos-Adentro-Admin-Conejo.jpg";
import { UilUserPlus, UilArrowRight, UilEdit, UilTrashAlt } from "@iconscout/react-unicons";
import { Fade } from "react-awesome-reveal";
import "../styles/globalStyle.css";
// Importo contextos
import { ErrorContext } from "../context/ErrorContext";
import { JwtContext } from "../context/JwtContext";

function CrearAlumno() {
  // Defino los contextos
  const { jwt } = useContext(JwtContext);
  const { openErrorModal } = useContext(ErrorContext);

  // Estados generales:
  const [arrayAlumnos, setArrayAlumnos] = useState([]);

  useEffect(() => {
    getAllAlumnos();
  },[arrayAlumnos])
  // Estados para los formularios
  // -> Crear Alumno   
  // Formulario de Creación de alumno
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [anio, setAnio] = useState(1);
  const [alDia, setAlDia] = useState(false);

  // Handles para los formularios
  const [showCreateForm, setShowCreateForm] = useState(false);
  const handleShowFormCreate = () => {
    setShowCreateForm(!showCreateForm);
  };

  /* CONEXIÓN DEL BACKEND CON EL FRONT */
  // --> FUNCIÓN CREAR ALUMNO <-- //
  const crearAlumno = async (e) => {
    e.preventDefault();

    // Tengo los valores, entonces lo guardo en un objeto para generar el alumno

    const alumno = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      alDia: alDia,
      anioCursado: anio,
    };

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt.token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(alumno);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/alumno/crear",
        requestOptions
      );

      // borro los inputs anteriores
      setNombre("");
      setApellido("");
      setDni("");
      setAnio("");
      setAlDia(false);
      handleShowFormCreate();

      if (response.status >= 400) {
        const errorBody = await response.json(); // hay que hacer un await por que el response también viene en async!
        throw new Error(errorBody.message);
      }

      await getAllAlumnos(); // obtengo todos los alumnos para actualizar la lista
    } catch (error) {
      if (error.message.length == 0 || error.status == 400) {
        openErrorModal("Hubo un error desconocido.");
      }

      openErrorModal(error.message);
    }
  };

  // Obtener todos los Alumnos

  const getAllAlumnos = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/alumno/findall",
        requestOptions
      );

      const result = await response.text();
      const array = JSON.parse(result).alumno;
      setArrayAlumnos(array);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="container row mx-auto py-lg-5 flex-md-row-reverse ">
        <div className="col-lg-6 my-4 my-lg-0">
          <figure
            className=" rounded-circle mx-auto overflow-hidden"
            style={{
              background: "#c9b7c7",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "auto",
            }}
          >
            <img
              className="img-fluid"
              src={conejoAlumno}
              alt="Imagen del usuario"
              style={{
                width: "100%",
              }}
            />
          </figure>
        </div>
        <div className="col-lg-6 mx-auto d-flex align-items-center">
          <div className="">
            <h3 className="text-center" style={{ color: "#866a80" }}>
              ¡Puedes crear los alumnos que necesites!
            </h3>

            <div className="text-center mt-3">
              <button
                className="col-md-4 btn text-white rounded-4 "
                style={{ background: "#4d3147 " }}
                onClick={handleShowFormCreate}
              >
                Crear Alumno <UilUserPlus />
              </button>
            </div>
          </div>
        </div>
        {showCreateForm ? (
          <Fade>
            <section className="my-2">
              {/* Sección de Creación del Boton de Alumno */}
              <form onSubmit={crearAlumno}>
                <div className="col-md-8 mx-auto my-2">
                  <input
                    type="text"
                    className="form-control rounded-4 "
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    minLength={3}
                    maxLength={25}
                    style={{
                      background: "#c9b7c7",
                      boxShadow: "inset 0 2px 3px #4d3147",
                    }}
                    required
                  />
                </div>
                <div className="col-md-8 mx-auto my-2">
                  <input
                    type="text"
                    className="form-control rounded-4 "
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    minLength={3}
                    maxLength={25}
                    style={{
                      background: "#c9b7c7",
                      boxShadow: "inset 0 2px 3px #4d3147",
                    }}
                    required
                  />
                </div>
                <div className="col-md-8 mx-auto my-2">
                  <input
                    type="text"
                    className="form-control rounded-4 "
                    placeholder="DNI"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    minLength={7}
                    maxLength={8}
                    style={{
                      background: "#c9b7c7",
                      boxShadow: "inset 0 2px 3px #4d3147",
                    }}
                    required
                  />
                </div>
                <div className="col-md-8 mx-auto my-2 text-center">
                  <label htmlFor="" className="custom-violet-second-color mx-2">
                    Año de Cursado
                  </label>
                  <select
                    name="anio-cursado"
                    defaultValue={anio}
                    onChange={(e) => {
                      setAnio(e.target.value);
                    }}
                    required
                  >
                    <option value="1">1er Año</option>
                    <option value="2">2do Año</option>
                    <option value="3">3er Año</option>
                    <option value="4">4to Año</option>
                  </select>
                </div>
                <div className="col-md-8 mx-auto my-2 text-center">
                  <label htmlFor="" className="custom-violet-second-color mx-2">
                    ¿Está al día de la Cuota?:
                  </label>
                  <select
                    name="anio-cursado"
                    defaultValue={alDia}
                    onChange={(e) => {
                      setAlDia(e.target.value);
                    }}
                    required
                  >
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="text-center mt-3 my-2">
                  <button
                    className="col-4 btn text-white rounded-4 "
                    style={{ background: "#4d3147 " }}
                  >
                    Enviar <UilArrowRight />
                  </button>
                </div>
              </form>
            </section>
          </Fade>
        ) : (
          <></>
        )}
      </div>
      <section className="container d-flex justify-content-center">
        <table className="table w-75">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              {/* <th scope="col">Contraseña</th> */}
              <th scope="col">Año de Cursado</th>
              <th scope="col">Cuota al día</th>
            </tr>
          </thead>
          <tbody className="table-group-divider text-center">
            {arrayAlumnos.map((alumno, index) => (
              <tr key={index}>
                <td className="text-break">{index}</td>
                <td className="text-break">{alumno.nombre}</td>
                <td className="text-break">{alumno.apellido}</td>
                <td className="text-break">{alumno.anioCursado}</td>
                <td className="text-break">{alumno.alDia ? "Sí" : "No"}</td>
                <td className="text-break">
                  <div className="text-center d-flex justify-content-around">
                    <button className="btn rounded-2">
                      <UilEdit />
                    </button>
                    <button className="btn rounded-2">
                      <UilTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default CrearAlumno;
