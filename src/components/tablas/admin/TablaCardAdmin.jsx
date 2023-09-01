import {
  UilAngleDoubleRight,
  UilEdit,
  UilTrashAlt,
  UilCardAtm,
  UilExclamationTriangle,
} from "@iconscout/react-unicons";
import { useRef, useState } from "react";
import "../../../styles/globalStyle.css";
import Tooltip from "../../tooltip";

const TablaCard = ({
  mongoID = undefined,
  nombre = undefined,
  apellido = undefined,
  // contrasenia = undefined,
  direccion = undefined,
  dni = undefined,
  celular = undefined,
  mail = undefined,
  onDelete = () => {},
  onUpdate = () => {},
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef(null);

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
            {/* <li>Contraseña: {contrasenia}</li> */}
            <li>Domicilio: {direccion}</li>
            <li>Celular: {celular}</li>
            <li>Mail: {mail}</li>
          </ul>
        </div>
        <div className="text-center d-flex justify-content-around">
          {!(dni == 40000000) ? (
            <>
              <button
                className="btn rounded-2"
                onClick={() => {
                  onUpdate(mongoID, nombre, apellido, dni);
                }}
              >
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
            </>
          ) : (
            <UilExclamationTriangle color="#e9b000" />
          )}
          <button
            className="btn rounded-2"
            ref={buttonRef}
            onClick={() => {
              setShowTooltip(!showTooltip);
            }}
          >
            <UilCardAtm />
          </button>
          <Tooltip
            text={`${mongoID}`}
            position="top"
            onClose={() => setShowTooltip(false)}
            showTooltip={showTooltip}
            buttonRef={buttonRef}
          />
        </div>
      </div>
    </div>
  );
};

export default TablaCard;
