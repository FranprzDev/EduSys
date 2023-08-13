import LogoImage from "../../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";
import { PopoverCuenta, PopoverInfo, PopoverSalir } from "../Popovers";

const NavBarAdministracion = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <button
              className="btn btn-outline text-gray rounded-4"
              onClick={() => navigate("/")}
            >
              <img
                src={LogoImage}
                alt="Logo"
                style={{ height: "100px", width: "150px" }}
              />
            </button>
          </div>
          <div className="col d-flex justify-content-end align-items-center">
            <PopoverInfo />
            <PopoverCuenta />
            <PopoverSalir />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarAdministracion;
