import { UilEdit, UilTrashAlt, UilExclamationTriangle  } from "@iconscout/react-unicons";

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
      <td className="text-break">{direccion}</td>
      <td className="text-break">{dni}</td>
      <td className="text-break">{celular}</td>
      <td className="text-break">{mail}</td>
      <td className="text-break">
        { !(dni == 40000000) ? (
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
          >
            <UilTrashAlt />
          </button>
        </div>
        ) : (
          <UilExclamationTriangle color="#e9b000"/>
        )}
      </td>
    </tr>
  );
}

export default TablaAdmin;
