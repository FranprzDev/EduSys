import { useContext, useState, useEffect } from "react";
import conejoAlumno from "../assets/images/Alumnos-Adentro-Admin-Conejo.jpg";
import { UilUserPlus, 
  UilArrowRight, 
  UilEdit, 
  UilTrashAlt, 
  UilAngleDoubleRight, 
  UilCardAtm, 
  UilMoneyBill,
  UilPlusCircle,
  UilNotes,
} from "@iconscout/react-unicons";
import { Fade } from "react-awesome-reveal";
import "../styles/globalStyle.css";
import EstasSeguro from "./modals/EstasSeguro";
import { useNavigate } from "react-router-dom";
// Importo contextos
import { ErrorContext } from "../context/ErrorContext";
import { JwtContext } from "../context/JwtContext";
import { API_URL } from "../utils/constants";

function CrearAlumno() {
  // Defino los contextos
  const { jwt } = useContext(JwtContext);
  const { openErrorModal } = useContext(ErrorContext);

  // Defino la navegación
  const navigate = useNavigate()
  // Estados generales:
  const [arrayAlumnos, setArrayAlumnos] = useState([]);
  const [idAlumno, setIdAlumno] = useState("");

  useEffect(() => {
    getAllAlumnos();
  },[idAlumno])

  // Estados para los modales
  const [showModalSeguro, setShowModalSeguro] = useState(false);



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

  const [showEditForm, setShowEditForm] = useState(false);
  const handleShowFormEdit = () => {
    setShowEditForm(!showEditForm);
  };

  const [showEditCuota, setShowEditCuota] = useState(false);
  const handleShowFormCuota = () => {
    setShowEditCuota(!showEditCuota);
  };

  // --> Lógica de mostrar bien la tabla
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);
  const handleResize = () => {
    setAnchoPantalla(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        `${API_URL}alumno/crear`,
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
        `${API_URL}alumno/findall`,
        requestOptions
      );

      const result = await response.text();
      const array = JSON.parse(result).alumno;
      setArrayAlumnos(array);
    } catch (error) {
      console.log("error", error);
    }
  };

  const editarAlumno = async (e) => {
    e.preventDefault();

    // Tengo los valores, entonces lo guardo en un objeto para generar el alumno
    
    const alumno = {
      nombre: nombre,
      apellido: apellido,
    };

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt.token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(alumno);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${API_URL}alumno/update-datos-by-id/${idAlumno}`,
        requestOptions
      );

      // borro los inputs anteriores
      setNombre("");
      setApellido("");
      handleShowFormEdit();

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
  }

  const eliminarAlumno = async () => {

    const myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${jwt.token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    setShowModalSeguro(false)

    try {
      const response = await fetch(
        `${API_URL}alumno/delete-by-id/${idAlumno}`,
        requestOptions
      );

      if (response.status >= 400) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      await getAllAlumnos();
    } catch (error) {
      if (error.message.length == 0 || error.status == 400) {
        openErrorModal("Hubo un error desconocido.");
      }

      openErrorModal(error.message);
    }
  };

  const editarCuota = async (e) => {
    e.preventDefault()

    const alumno = {
      alDia: alDia
    }
    
    const myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${jwt.token}`);

    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(alumno);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {

      const response = await fetch(
        `${API_URL}alumno/update-alDia-by-id/${idAlumno}`,
        requestOptions
      );

      if (response.status >= 400) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      await getAllAlumnos();
      handleShowFormCuota();
    } catch (error) {
      if (error.message.length == 0 || error.status == 400) {
        openErrorModal("Hubo un error desconocido.");
      }

      openErrorModal(error.message);
    }
  }

  const handleAddYear = async (id) => {

    const myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${jwt.token}`);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    console.log(idAlumno)
    try {
      // preguntar a josé...
      const response = await fetch(
        `${API_URL}alumno/update-anioCursado-by-id/${id}`,
        requestOptions
      );
        console.log("response:", response)

      if (response.status >= 400) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }
      
      await getAllAlumnos();
    } catch (error) {
      if (error.message.length == 0 || error.status == 400) {
        openErrorModal("Hubo un error desconocido.");
      }

      openErrorModal(error.message);
    }

  }

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
        <div className="col-lg-6 mx-auto d-flex align-items-center justify-content-center">
          <div className="text-center">
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
            <section className="crear-alumno my-3">
              <h2 className="custom-violet-second-color text-center">
                Crear Alumno
              </h2>
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
        {showEditForm ? (
          <Fade>
            <section className="editar-alumno my-2">
              <h2 className="custom-violet-second-color text-center">
                Editar datos del Alumno
              </h2>
              <form onSubmit={editarAlumno}>
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

        {showEditCuota ? (
          <Fade>
            <section className="editar-alumno my-2">
              <h2 className="custom-violet-second-color text-center">
                Actualizar el estado de la Cuota
              </h2>
              <form onSubmit={editarCuota} className="text-center">
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
      <section className="container d-flex justify-content-center my-3">
        {anchoPantalla >= 1200 ? (
          <table className="table w-75">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                {/* <th scope="col">Contraseña</th> */}
                <th scope="col">Año de Cursado</th>
                <th scope="col">Cuota al día</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody className="table-group-divider text-center">
              {arrayAlumnos?.map((alumno, index) => (
                <tr key={index}>
                  <td className="text-break">{index + 1}</td>
                  <td className="text-break">{alumno.nombre}</td>
                  <td className="text-break">{alumno.apellido}</td>
                  <td className="text-break">{alumno.anioCursado}</td>
                  {alumno.alDia ? (
                    <td className="text-break text-success">Sí</td>
                  ) : (
                    <td className="text-break text-danger">No</td>
                  )}
                  <td className="text-break">
                    <div className="text-center d-flex justify-content-around">
                      <button
                        className="btn rounded-2"
                        onClick={() => {
                          setIdAlumno(alumno._id);
                          handleShowFormEdit();
                        }}
                      >
                        <UilEdit />
                      </button>
                      <button
                        className="btn rounded-2"
                        onClick={() => {
                          setShowModalSeguro(true);
                          setIdAlumno(alumno._id);
                        }}
                      >
                        <UilTrashAlt />
                      </button>
                      <button
                        className="btn rounded-2"
                        onClick={() => {
                          setIdAlumno(alumno._id);
                          handleShowFormCuota();
                        }}
                      >
                        {alumno.alDia ? (
                          <UilMoneyBill color="#20B926" />
                        ) : (
                          <UilMoneyBill color="#FF0000" />
                        )}
                      </button>
                      <button
                        className="btn rounded-2"
                        onClick={() => {
                          handleAddYear(alumno._id);
                        }}
                      >
                        <UilPlusCircle />
                      </button>
                      <button
                        className="btn rounded-2"
                        onClick={() => {
                          navigate(
                            `notas-cursado/${alumno.nombre}-${alumno.apellido}-${alumno.anioCursado}`,
                            {
                              state: {
                                idAlumno: alumno._id,
                                nombre: alumno.nombre,
                                apellido: alumno.apellido,
                                anioCursado: alumno.anioCursado,
                              },
                            }
                          );
                        }}
                      >
                        <UilNotes />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="container">
            <div className="row justify-content-center">
              {arrayAlumnos?.map((alumno, index) => (
                <div className="col-xs-12 col-lg-6 my-1" key={index}>
                  <div className="card">
                    <header className="card-header">
                      <h5 className="card-title">
                        <span className="text-danger">ALUMNO</span>
                        <UilAngleDoubleRight color="#866A80" />
                        <span className="custom-violet-third-color">
                          {alumno.nombre} {alumno.apellido}
                        </span>
                      </h5>
                    </header>
                    <div className="card-body">
                      <ul className="list-unstyled">
                        <li>DNI: {alumno.dni}</li>
                        <li>Año de Cursado: {alumno.anioCursado}</li>
                        {alumno.alDia ? (
                          <li className="text-success">Cuota al día: Si</li>
                        ) : (
                          <li className="text-danger">Cuota al día: No</li>
                        )}
                      </ul>
                    </div>
                    <div className="text-center d-flex justify-content-around">
                      <button
                        className="btn rounded-2"
                        onClick={handleShowFormEdit}
                      >
                        <UilEdit />
                      </button>
                      <button
                        className="btn rounded-2"
                        onClick={() => {
                          setShowModalSeguro(true);
                          setIdAlumno(alumno._id);
                        }}
                      >
                        <UilTrashAlt />
                      </button>
                      <button
                        className="btn rounded-2"
                        onClick={() => {
                          setIdAlumno(alumno._id);
                          handleShowFormCuota();
                        }}
                      >
                        {alumno.alDia ? (
                          <UilMoneyBill color="#20B926" />
                        ) : (
                          <UilMoneyBill color="#FF0000" />
                        )}
                      </button>
                      <button
                        className="btn rounded-2"
                        onClick={() => {
                          handleAddYear(alumno._id);
                        }}
                      >
                        <UilPlusCircle />
                      </button>
                      <button
                        className="btn rounded-2"
                        onClick={() => {
                          navigate(
                            `notas-cursado/${alumno.nombre}-${alumno.apellido}-${alumno.anioCursado}`,
                            {
                              state: {
                                idAlumno: alumno._id,
                                nombre: alumno.nombre,
                                apellido: alumno.apellido,
                                anioCursado: alumno.anioCursado,
                              },
                            }
                          );
                        }}
                      >
                        <UilNotes />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* MODALES */}

      {showModalSeguro && (
        <EstasSeguro
          onAccept={() => {
            eliminarAlumno();
          }}
          onClose={() => setShowModalSeguro(false)}
        />
      )}
    </>
  );
}

export default CrearAlumno;
