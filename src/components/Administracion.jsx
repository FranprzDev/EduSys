// Importaciones
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { JwtContext } from "../context/JwtContext";

// -> Importaciones de UI
import confetti from "canvas-confetti";
import Conejo from "../assets/images/Admin-Conejo.png";
import {
  UilCog,
  UilUserSquare,
  UilEdit,
  UilBracketsCurly,
  UilCreateDashboard,
} from "@iconscout/react-unicons";
import ActualizarDatos from "./modals/ActualizarDatos";
import ActualizarContraseña from "./modals/ActualizarContraseña";
import "../styles/globalStyle.css";

// Import de Animaciones
import { JackInTheBox, Slide } from "react-awesome-reveal";
import TablaCardAdmin from "./tablas/admin/TablaCardAdmin";
import TablaAdmin from "./tablas/admin/TablaAdmin";
import EstasSeguro from "./modals/EstasSeguro";
import EditarAdministrador from "./modals/EditarAdministrador";

function Administracion() {
  // Necesarios para moverme & lógica de CRUD
  const { jwt } = useContext(JwtContext);
  const navigate = useNavigate();

  // -> Lógica para los modales & Recursos visuales <-
  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [idTentativo, setIdTentativo] = useState("");

  const handleClosePass = () => setShowPass(false);
  const handleShowPass = () => setShowPass(true);

  const handleClose = () => setShow(false);
  const [message, setMessage] = useState("");

  // estos son para el estas seguro? del trash no funcionan
  const [showEstas, setShowEstas] = useState(false)

  const handleCloseEstas = () => {
    setShowEstas(false);
    setIdTentativo("");
  }
  const handleOpenEstas = (id) => {
    setIdTentativo(id)
    setShowEstas(true)
  }



  // Manejar el mensaje en función del botón presionado
  const handleShowMessage = (text) => {
    setMessage(text);
    setShow(!show);
  };

  // Lógica para el modal de EditarAdministrador
  const [showEditarAdmin, setShowEditarAdmin] = useState("")

    const [idAdmin, setID] = useState(""); 
    const [nombreAdmin, setNombreAdmin] = useState("");
    const [apellidoAdmin, setApellidoAdmin] = useState("");
    const [dniAdmin, setDniAdmin] = useState("");

    const [adminData, setAdminData] = useState({})

    const handleOpenUpdateAdmin = (id, nombre, apellido, dni) => { 
      
      setID(id)
      setNombreAdmin(nombre)
      setApellidoAdmin(apellido)
      setDniAdmin(dni)  
      
    let admin = {
      adminId: idAdmin,
      nombre: nombreAdmin,
      apellido: apellidoAdmin,
      dni: dniAdmin,
    }

    setAdminData(admin)
    setShowEditarAdmin(true)
  }

  useEffect(() => {
    let admin = {
      adminId: idAdmin,
      nombre: nombreAdmin,
      apellido: apellidoAdmin,
      dni: dniAdmin,
    };
    setAdminData(admin);
  }, [idAdmin, nombreAdmin, apellidoAdmin, dniAdmin]);

  const handleUpdateAdmin = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt.token}`);
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      nombre: adminData.nombre,
      apellido: adminData.apellido,
      dni: adminData.dni,
    });
  
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    
    console.log("adminData: ", adminData)
    console.log("adminData.adminId: ", adminData.adminId)
    console.log("requestOptions: ", requestOptions)

    

    try {
      const response = await fetch(
        `http://localhost:8000/admin//update-camp-by-id/${adminData.adminId}`,
        requestOptions
      );
  
      const result = await response.json();
      // console.log(result.message); -> me tengo que quedar con este
      console.log(result.message);
      if (result.message === "Se encontro el administrador.") {
        onCloseEditarAdmin();
        getAllAdmins();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  
  const onCloseEditarAdmin = () => {
    setShowEditarAdmin(false)
    setID("")
    setNombreAdmin("")
    setApellidoAdmin("")
    setDniAdmin("")
  }

  useEffect(() => {
    confetti();
    // modal de iniciaste sesion como {TIPO-DE-ADMIN}
  }, []);

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

  // Lógica para el ocultar tabla & petición al servidor <--

  // ReactHooks
  const [showTable, setShowTable] = useState(false);
  const [arrayAdmin, setArrayAdmin] = useState([]);

  // Funciones
  const getAllAdmins = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/admin/findall",
        requestOptions
      );
      const result = await response.text();
      const array = JSON.parse(result).admin;
      setArrayAdmin(array);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  const handleTable = () => {
    setShowTable(!showTable);

    if (!showTable) {
      getAllAdmins();
    }
  };

  // Fin de Manejo de Tabla & Petición al Servidor

  // Comienzo de Función de Eliminación de DB

  const handleDeleteAdmin = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt.token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:8000/admin/delete-by-id/${idTentativo}`,
        requestOptions
      );
      const result = await response.text();
      console.log(result);
      await getAllAdmins();
      handleCloseEstas();
    } catch (error) {
      console.log("error", error);
    }
  };

  // Fin de Función de Eliminación de DB
  // Comienzo de Lógica de Creación de Admin

  const handleCreateAdmin = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt.token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/admin/create",
        requestOptions
      );

      if(response.status >= 400){
        const errorBody = await response.json(); // hay que hacer un await por que el response también viene en async!
        throw new Error(errorBody.message);
      }

      const result = await response.text();
      await getAllAdmins();
      handleClose()
    } catch (error) {
      // open modal y le paso msg 
      setCustomError(error.message)
      setMostrarCustomError(true)
      setErrorMessage(error.message ?? "activamelopapá");
    }
  };

  return (
    <>
      <JackInTheBox delay={200}>
        <>
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
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
              <div className="col-12">
                {jwt.email === "admin@gmail.com" ? (
                  <>
                    <h2 className="custom-violet-third-color text-center">
                      Hola Super {jwt.nombre} {jwt.apellido}
                    </h2>
                    <h5 className="custom-violet-first-color text-center">
                      ¡Estás en una cuenta de Super Administrador!
                    </h5>
                  </>
                ) : (
                  <>
                    <h2 className="text-center">
                      Hola {jwt.nombre} {jwt.apellido}
                    </h2>
                    <div className="col-md-8 mx-auto">
                      <p>DNI: {jwt.dni}</p>
                      <p>Direccion: {jwt.direccion}</p>
                      <p>Celular: {jwt.celular}</p>
                      <p>Mail: {jwt.email}</p>
                    </div>
                  </>
                )}
              </div>
              {jwt.email !== "admin@gmail.com" ? (
                <div className="col-md-6 col-lg-8 mx-auto">
                  <button
                    className="col-12 btn text-white rounded-4 "
                    onClick={() => handleShowMessage("Actualizar Datos")}
                    style={{ background: "#4d3147 " }}
                  >
                    Actualizar Datos <UilCog />
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
              ) : (
                <div className="col-md-6 col-lg-8 mx-auto">
                  <button
                    className="col-12 my-3 btn text-white rounded-4 "
                    style={{ background: "#4d3147 " }}
                    onClick={() => handleShowMessage("Crear Administrador")}
                  >
                    Crear un Administrador <UilCreateDashboard />
                  </button>
                  <button
                    className="col-12 btn text-white rounded-4 "
                    style={{ background: "#4d3147 " }}
                    onClick={handleTable}
                  >
                    Mostrar tabla de Administradores <UilBracketsCurly />
                  </button>
                </div>
              )}
            </div>
          </div>

          <Slide>
            {showTable === true && jwt.email === "admin@gmail.com" ? (
              anchoPantalla >= 1200 ? (
                <section className="d-flex justify-content-center">
                  {/* <Slide> */}
                  <table className="table w-75">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">MongoID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        {/* <th scope="col">Contraseña</th> */}
                        <th scope="col">Direccion</th>
                        <th scope="col">DNI</th>
                        <th scope="col">Celular</th>
                        <th scope="col">Mail</th>
                        <th scope="col">Opciones</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider text-center">
                      {arrayAdmin.map((admin, index) => (
                        <TablaAdmin
                          key={index}
                          mongoID={admin._id}
                          nombre={admin.nombre}
                          apellido={admin.apellido}
                          // contrasenia={admin.contrasenia}
                          direccion={admin.direccion}
                          dni={admin.dni}
                          celular={admin.celular}
                          mail={admin.mail}
                          onDelete={handleOpenEstas}
                          onUpdate={handleOpenUpdateAdmin}
                        />
                      ))}
                    </tbody>
                  </table>
                  {/* </Slide> */}
                </section>
              ) : (
                <>
                  <section>
                    <div className="container">
                      <div className="row justify-content-center">
                        {arrayAdmin.map((admin, index) => (
                          <TablaCardAdmin
                            key={index}
                            mongoID={admin._id}
                            nombre={admin.nombre}
                            apellido={admin.apellido}
                            // contrasenia={admin.contrasenia}
                            direccion={admin.direccion}
                            dni={admin.dni}
                            celular={admin.celular}
                            mail={admin.mail}
                            onDelete={handleOpenEstas}
                            onUpdate={handleOpenUpdateAdmin}
                          />
                        ))}
                      </div>
                    </div>
                  </section>
                </>
              )
            ) : (
              <></>
            )}
          </Slide>
        </>
      </JackInTheBox>

      { show && (
        <ActualizarDatos handleClose={handleClose} message={message} admin={undefined} createAdmin={handleCreateAdmin}/>
      )}
      <ActualizarContraseña
        showPass={showPass}
        handleClosePass={handleClosePass}
      />
      {showEstas && (
        <EstasSeguro onAccept={handleDeleteAdmin} onClose={handleCloseEstas} />
      )}
      {
        showEditarAdmin && (
          <EditarAdministrador onCloseModal={onCloseEditarAdmin} 
          onShowModal={() => {handleOpenUpdateAdmin()}}
          onSubmit={() => {handleUpdateAdmin()}}
          adminData={adminData}
          />
        )
      }
    </>
  );
}

export default Administracion;
