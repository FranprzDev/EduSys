import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import "../styles/globalStyle.css";
import { Fade, JackInTheBox } from "react-awesome-reveal";
import NavBarAdministracion from "../components/Navbars/NavBarAdministracion";
import { UilEdit, UilSave, UilTrashAlt } from "@iconscout/react-unicons";
import { API_URL } from "../utils/constants";
// Importo contextos
import { ErrorContext } from "../context/ErrorContext";
import { JwtContext } from "../context/JwtContext";
let arrayPromedio = [];

function NotasAlumno() {
  const { openErrorModal } = useContext(ErrorContext);
  const { jwt } = useContext(JwtContext);
  const location = useLocation();
  const { nombre, apellido, anioCursado = 0, idAlumno } = location.state;

  // Estados para ir genernado

  const [arrayMaterias, setArrayMaterias] = useState([]);

  // Estados para mi Notas
  const [editNota, setEditNota] = useState(0);
  const [editingNote, setEditingNote] = useState(null);
  const [promedioNotas, setPromedioNotas] = useState(
    new Array(anioCursado).fill(0)
  );

  // const [arrayPromedio, setArrayPromedio] = useState([]);

  const getNotasByYear = async (anio = 0) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${jwt.token}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const response = await fetch(
        `${API_URL}notas/alumno/${idAlumno}`,
        requestOptions
      );

      if (!response.ok) {
        if (response.status == 404) {
          throw new Error("No se encontraron notas para el año seleccionado");
        }

        throw new Error("Error al obtener las notas");
      }
      const data = await response.json();
      // setArrayMaterias(prev => [...prev, ...data.notasFiltradas])
      setArrayMaterias(data.notasFiltradas);
    } catch (error) {
      openErrorModal(error.message);
    }
  };

  const handleEditMateria = async (anioMateria, nota, idMateria) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt.token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      idAlumno: idAlumno,
      idMateria: idMateria,
      anio: anioMateria,
      nota: nota,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${API_URL}notas/editar-nota`,
        requestOptions
      );

      if (!response.ok) {
        if (response.status == 404) {
          throw new Error(
            "Hubo un problema grave, contacta a un administrador"
          );
        }

        throw new Error("Error al actualizar las notas");
      }

      await getNotasByYear(anioMateria);
      await handleCalcular(anioMateria);
      setEditingNote(null);
      setEditNota(0);
    } catch (error) {
      openErrorModal(error.message);
    }
  };

  const calcularPromedio = async (anioACalcular) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt.token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${API_URL}notas/calcular-promedio-anio/${anioACalcular}/${idAlumno}`,
        requestOptions
      );

      if (!response.ok) {
        if (response.status == 404) {
          throw new Error(
            "Hubo un problema grave, contacta a un administrador"
          );
        }

        throw new Error("Error al consultar el promedio, no hay notas.");
      }

      const data = await response.json();
      // data.promedio me trae el promedio desde el backend.
      // Este promedio es acorde al año y a las materias, este está bien.
      // Ahora tnego que guardarlo de alguna manera.
      // Si pongo el promedio en la posición específica al anioCalcular

      arrayPromedio[anioACalcular - 1] = data.promedio;

      setPromedioNotas(arrayPromedio);
    } catch (error) {
      openErrorModal(error.message);
    }
  };

  const handleCalcular = async (anioACalcular) => {
    for (let i = 1; i <= anioACalcular; i++) {
      await calcularPromedio(i);
    }
  };

  useEffect(() => {
    getNotasByYear();
    handleCalcular(anioCursado);
  }, []);

  return (
    <>
      <NavBarAdministracion />
      <section className="personal-dates text-center my-2">
        <JackInTheBox>
          <h1 className="custom-violet-third-color fs-1">
            Notas de{" "}
            <span className="custom-violet-first-color">
              {nombre} {apellido}
            </span>
          </h1>
          <h3>
            <section className="custom-violet-first-color fs-5 d-flex flex-column justify-content-center">
              <>
                Año de cursado:{" "}
                <span
                  className={
                    anioCursado == 4
                      ? "custom-violet-first-color"
                      : "custom-violet-third-color"
                  }
                >
                  {anioCursado}
                </span>
                <>Promedio General: </>
                <span className="custom-violet-third-color">
                  {(
                    promedioNotas.reduce(
                      (acc, nota) => acc + parseFloat(nota),
                      0
                    ) / anioCursado
                  ).toFixed(2)}
                </span>
              </>
            </section>
          </h3>
        </JackInTheBox>
      </section>

      {Array.from({ length: anioCursado })?.map((_, index) => (
        <section
          className="tabla-materias d-flex justify-content-center my-4"
          key={index}
        >
          <table className="table w-75">
            <thead>
              <tr className="text-center">
                <th scope="col">
                  <span className="custom-violet-first-color">
                    <span className="custom-violet-third-color">
                      [{index + 1}]
                    </span>{" "}
                    Materias{" "}
                    <span className="bold">
                      [PROMEDIO {promedioNotas[index]?.toFixed(2)}]
                    </span>
                  </span>
                </th>
                <th scope="col">Nota</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody className="table-group-divider text-center">
              {arrayMaterias
                ?.sort((a, b) => a.materia.localeCompare(b.materia))
                .sort((a, b) => a.anio - b.anio)
                .slice(index * 9, (index + 1) * 9)
                .map((materia, subIndex) => (
                  <tr key={subIndex}>
                    <td className="text-break">{materia.materia}</td>
                    <td
                      className={
                        materia.nota >= 6
                          ? "text-break text-success"
                          : "text-break text-danger"
                      }
                    >
                      {materia.nota === 0
                        ? "-"
                        : materia.nota >= 1 && materia.nota < 6
                        ? materia.nota + " (Desaprobado)"
                        : materia.nota >= 6 && materia.nota < 7
                        ? materia.nota + " (Aprobado)"
                        : materia.nota >= 7 && materia.nota < 10
                        ? materia.nota + " (Promocionado)"
                        : materia.nota === 10
                        ? "(Excelente) " +
                          "✨ " +
                          materia.nota +
                          " ✨ " +
                          "(Excelente)"
                        : ""}
                    </td>
                    <td className="text-break d-flex justify-content-center">
                      <button
                        className="btn rounded-2 mx-2"
                        onClick={() => {
                          setEditingNote({
                            idMateria: materia.idMateria,
                            anio: materia.anio,
                            idNota: materia.idNota,
                          });
                        }}
                      >
                        <UilEdit />
                      </button>
                      {editingNote &&
                        editingNote.idNota === materia.idNota &&
                        editingNote.anio === materia.anio && (
                          <Fade>
                            <>
                              <form
                                className="d-flex justify-content-center align-items-center w-100 h-100"
                                onSubmit={(e) => {
                                  e.preventDefault(); // Evitar el envío del formulario por defecto
                                  handleEditMateria(
                                    index + 1,
                                    editNota,
                                    materia.idMateria
                                  );
                                }}
                              >
                                <input
                                  type="number"
                                  className="form-control rounded-4 w-75 mx-2 text-center"
                                  placeholder="Nota"
                                  value={editNota}
                                  onChange={(e) => setEditNota(e.target.value)}
                                  minLength={1}
                                  maxLength={2}
                                  max={10}
                                  min={1}
                                  style={{
                                    background: "#c9b7c7",
                                    boxShadow: "inset 0 2px 3px #4d3147",
                                  }}
                                  required
                                />

                                <button
                                className="btn text-white rounded-4 w-25 mx-2"
                                style={{ background: "#4d3147 " }}
                                  onClick={() => {
                                    setEditingNote(null);
                                    setEditNota(0);
                                  }}
                                >
                                  <UilTrashAlt/>
                                </button>
                                <button
                                  type="submit" // Cambia el tipo de botón para que funcione como botón de envío
                                  className="btn text-white rounded-4 w-50"
                                  style={{ background: "#4d3147 " }}
                                >
                                  <UilSave />
                                </button>

                              </form>
                            </>
                          </Fade>
                        )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      ))}
    </>
  );
}

export default NotasAlumno;
