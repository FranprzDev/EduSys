import React, { useState } from "react";
import {
  UilAngleDoubleRight,
  UilEdit,
  UilTrashAlt,
  UilCardAtm,
} from "@iconscout/react-unicons";

const TablaCard = ({
  mongoID = undefined,
  nombre = undefined,
  apellido = undefined,
  contrasenia = undefined,
  direccion = undefined,
  dni = undefined,
  celular = undefined,
  mail = undefined,
  onDelete = undefined,
}) => {
  return (
    <div className="col-xs-12 col-lg-6 my-1">
      <div className="card">
        <header className="card-header">
          <h5 className="card-title">
            <span className="text-danger">ADMIN</span>
            <UilAngleDoubleRight color="#866A80" />
            <span className="custom-violet-third-color">
              {nombre} {apellido}
            </span>
          </h5>
        </header>
        <div className="card-body">
          <ul className="list-unstyled">
            <li>DNI: {dni}</li>
            <li>Contraseña: {contrasenia}</li>
            <li>Domicilio: {direccion}</li>
            <li>Celular: {celular}</li>
            <li>Mail: {mail}</li>
          </ul>
        </div>
        <div className="text-center d-flex justify-content-around">
          <button className="btn rounded-2">
            <UilEdit />
          </button>
          <button
            className="btn rounded-2"
            onClick={() => {
              onDelete(mongoID);
            }}
          >
            <UilTrashAlt />
          </button>
          <button className="btn rounded-2">
            <UilCardAtm />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablaCard;
