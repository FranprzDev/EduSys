import React, { useState } from "react";
import { UilEdit, UilTrashAlt } from "@iconscout/react-unicons";

function TablaAdmin({
  mongoID = undefined,
  nombre = undefined,
  apellido = undefined,
  // contrasenia = undefined,
  direccion = undefined,
  dni = undefined,
  celular = undefined,
  mail = undefined,
  index = undefined,
  onDelete = () => {},
  onUpdate = () => {},
}) {
  return (
    <tr key={index}>
      <td className="text-break">{mongoID}</td>
      <td className="text-break">{nombre}</td>
      <td className="text-break">{apellido}</td>
      {/* <td className="text-break">{contrasenia}</td> */}
      <td className="text-break">{direccion}</td>
      <td className="text-break">{dni}</td>
      <td className="text-break">{celular}</td>
      <td className="text-break">{mail}</td>
      <td className="text-break">
        <div className="text-center d-flex justify-content-around">
          <button
            className="btn rounded-2"
            onClick={() => { 
              onUpdate(mongoID, nombre, apellido, dni) }}
          >
            <UilEdit />
          </button>
          <button
            className="btn rounded-2"
            onClick={() => {
              onDelete(mongoID);
            }}
            // me gustaria que no se pueda eliminar el superAdministrador.
          >
            <UilTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TablaAdmin;
