import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import "../styles/globalStyle.css";
import { JackInTheBox } from "react-awesome-reveal";
import NavBarAdministracion from "../components/navbars/NavBarAdministracion";
import { arrayMateriasPredefinidas } from "../utils/constants";
import {   UilTrashAlt,
    UilEdit
} from "@iconscout/react-unicons";
// Importo contextos
import { ErrorContext } from "../context/ErrorContext";


function NotasAlumno() {
  const { openErrorModal } = useContext(ErrorContext);
  const location = useLocation();
  const { nombre, apellido, anioCursado, idAlumno } = location.state;

  // Estados para ir genernado

  const [arrayMaterias, setArrayMaterias] = useState([]);

    // La idea es que la primera vez que se carge la app me traiga todo para poder generarlo con el map
    // y despues ir agregando las notas de cada año mediante las opciones
    useEffect(() => {
        for(let i = 1; i <= anioCursado; i++){
            getNotasByYear(i);
        }
    }, [])

    const getNotasByYear = async (anio) => {
    try {
      const response = await fetch(
        `http://localhost:8000/notas/alumno/${idAlumno}/${anio}`
      );

      if (!response.ok) {
        if (response.status == 404) {
          throw new Error("No se encontraron notas para el año seleccionado");
        }

        throw new Error("Error al obtener las notas");
      }
      const data = await response.json();

      setArrayMaterias(prevArray => [...prevArray, ...data.notas]);
    } catch (error) {
      openErrorModal(error.message);
    }
  };

  return (
    <>
      <NavBarAdministracion />
      <section className="personal-dates text-center my-2">
        <JackInTheBox>
          <h1 className="custom-violet-third-color fs-1">
            Notas de{" "}
            <span className="custom-violet-first-color">
              {nombre.toUpperCase()} {apellido.toUpperCase()}
            </span>
          </h1>
          <h3>
            <section className="custom-violet-first-color fs-5">
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
            </section>
          </h3>
        </JackInTheBox>
      </section>
        
    {
        arrayMaterias.map((materia, index) => {
            <section className="materias d-flex justify-content-center my-4">
              <table className="table w-75">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Materias {index}</th>
                    <th scope="col">Nota</th>
                    <th scope="col">Opciones</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider text-center">
                  <td className="text-break">{materia.nombre}</td>
                  {arrayMateriasPredefinidas.map((materia, index) => {
                    <td className="text-break" key={index}>
                      {materia.nombre}
                    </td>;
                  })}
                  <td className="text-break">{materia.nota}</td>
                  <td className="text-break">
                    <button className="btn rounded-2">
                      <UilEdit />
                    </button>
                    <button className="btn rounded-2">
                      <UilTrashAlt />
                    </button>
                  </td>
                </tbody>
              </table>
            </section>;   
        
        })
    }
    </>
  );
}

export default NotasAlumno;
