// Importaciones
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import jwtDecode from "jwt-decode";
import { ErrorContext } from "../context/ErrorContext";
import CrearAdmin from "./modals/CrearAdmin";
import { API_URL } from "../utils/constants";

function Administracion() {

  // Necesarios para moverme & lógica de CRUD
  const { jwt, destroySession } = useContext(JwtContext);
  const { openErrorModal } = useContext(ErrorContext)
  const navigate = useNavigate();

  // -> Lógica para los modales & Recursos visuales <-
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [idTentativo, setIdTentativo] = useState("");

  const handleClose = () => setShow(false);
  const [message, setMessage] = useState("");

  // este es ele stas seguro del trash
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

  // -> -> -> Está todo aquí
  // Lógica para el editar del Super Administrador
  const [showEditarAdmin, setShowEditarAdmin] = useState("");

  const [adminData, setAdminData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    id: "",
  });

  const handleOpenUpdateAdmin = (id, nombre, apellido, dni) => {
    const admin = {
      adminId: id,
      nombre: nombre,
      apellido: apellido,
      dni: dni,
    };

    setAdminData(admin);
    setShowEditarAdmin(true);
  };

  const handleChangeUpdateAdminValues = (prop, value) => {
    setAdminData((values) => ({
      ...values,
      [prop]: value,
    }));
  };

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

    try {
      const response = await fetch(
        `${API_URL}admin/update-camp-by-id/${adminData.adminId}`,
        requestOptions
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error("Hubo un problema al actualizar los datos");
      }

      if (result.message === "Se encontro el administrador.") {
        onCloseEditarAdmin();
        getAllAdmins();
      }
    } catch (error) {
      openErrorModal(error.message)
    }
  };

  const onCloseEditarAdmin = () => {
    setShowEditarAdmin(false)
  }

  // Fin de Lógica para editar superAdministrador

  // Inicio de la Lógica para editar el Administrador común [mail, celular, direccion]
  const [showEditarCommonAdmin, setShowEditarCommonAdmin] = useState(false);

  const onCloseEditarCommonAdmin = () => {
    setShowEditarCommonAdmin(false)
  }

  // Establezco los id correspondientes

  const [commonAdminData, setCommonAdminData] = useState({
    adminId: jwt.id,
    celular: jwt.celular,
    mail: jwt.email,
    direccion: jwt.direccion,
  });

  const handleOpenUpdateAdminCommon = (celular, mail, direccion) => {
    const admin = {
      ...commonAdminData,
      celular: celular,
      mail: mail,
      direccion: direccion,
    };

    setCommonAdminData(admin);
    setShowEditarCommonAdmin(true);
  };

  const handleChangeUpdateAdminCommonValues = (prop, value) => {
    setCommonAdminData((values) => ({
      ...values,
      [prop]: value,
    }));
  };

  const handleUpdateCommonAdmin = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt.token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      celular: commonAdminData.celular,
      direccion: commonAdminData.direccion,
      mail: commonAdminData.mail,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${API_URL}admin/update-common-by-id/${commonAdminData.adminId}`,
        requestOptions
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error("Hubo un problema al actualizar los datos");
      }

      onCloseEditarCommonAdmin();
      destroySession()
    } catch (error) {
      openErrorModal(error.message)
    }
  }
  // fin de la lógica para editar el administrador común
  // inicio de la lógica para el admin data

  const [showPass, setShowPass] = useState(false);
  const handleClosePass = () => setShowPass(false);
  const handleShowPass = () => setShowPass(true);

  const [commonPass, setCommonPass] = useState({
    adminID: jwt.id,
    pass: '',
    retryPass: '',
  });

  const handleChangePasswordData = (prop, value) => {
    setCommonPass((values) => ({
      ...values,
      [prop]: value,
    }));
  };

  const handleUpdatePasswordAdmin = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt.token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      pass: commonPass.pass,
      retryPass: commonPass.retryPass
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${API_URL}admin/update-password/${commonPass.adminID}`,
        requestOptions
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.mensaje);
      }

      onCloseEditarCommonAdmin();
      destroySession()
      navigate("/login")
    }
    catch (error) {
      openErrorModal(error.message)
    }
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
        `${API_URL}admin/findall`,
        requestOptions
      );
      const result = await response.text();
      const array = JSON.parse(result).admin;
      setArrayAdmin(array);
    } catch (error) {
      openErrorModal(error.message)
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
        `${API_URL}admin/delete-by-id/${idTentativo}`,
        requestOptions
      );
      const result = await response.text();
      
      // if(!result.ok){
      //   navigate("/auth/administracion")
      // }

      handleCloseEstas();
      await getAllAdmins();
    } catch (error) {
      openErrorModal(error.message)
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
        `${API_URL}admin/create`,
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
      openErrorModal(error.message)
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
                    onClick={() => { setShowEditarCommonAdmin(true) }}
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
                    onClick={() => {
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
                      {arrayAdmin?.map((admin, index) => (
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
                </section>
              ) : (
                <>
                  <section>
                    <div className="container">
                      <div className="row justify-content-center">
                        {arrayAdmin?.map((admin, index) => (
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
          {/* Esta es la animación de la table. */}
        </>
      </JackInTheBox>
      {/* Esta es una animación */}

      {/* Crear Administrador siendo SuperAdministrador */}

      {show && (
        <CrearAdmin
          handleClose={handleClose}
          message={message}
          admin={adminData}
          createAdmin={handleCreateAdmin}
        />
      )

      }

      {/* Modales de SuperAdministrador */}
      {showEditarAdmin && (
        <EditarAdministrador
          onCloseModal={onCloseEditarAdmin}
          onShowModal={handleOpenUpdateAdmin}
          onChangeAdminData={handleChangeUpdateAdminValues}
          onSubmit={handleUpdateAdmin}
          adminData={adminData}
        />
      )}

      {/* Modal para ver si estas seguro en el cambio */}
      {showEstas && (
        <EstasSeguro onAccept={handleDeleteAdmin} onClose={handleCloseEstas} />
      )}
      {/* Modal para editar el amdinistrador siendo superadminsitrador */}

      {/* Modales para Administradores Comunes */}

      {/* Modal para actualizar los datos de un administrador normal*/}
      {showEditarCommonAdmin && (
        <ActualizarDatos
          onCloseModal={onCloseEditarCommonAdmin} // cambiado
          onShowModal={handleOpenUpdateAdminCommon} // cambiado
          onChangeAdminData={handleChangeUpdateAdminCommonValues} // cambiado
          onSubmit={handleUpdateCommonAdmin}
          adminData={commonAdminData}
        />
      )}

      {/* Modal para cambiar la contraseña de un administrador normal*/}
      {showPass && (
        <ActualizarContraseña
          onCloseModal={handleClosePass} // cambiado
          onShowModal={showPass} // cambiado
          onChangeAdminData={handleChangePasswordData} // cambiado
          onSubmit={handleUpdatePasswordAdmin}
          adminData={commonPass}
        />
      )}

    </>
  );
}

export default Administracion;
