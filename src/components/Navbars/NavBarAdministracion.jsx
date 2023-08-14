import React, { useState } from 'react';
import LogoImage from "../../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";
import { PopoverCuenta, PopoverInfo, PopoverSalir } from "../Popovers";

const NavBarAdministracion = () => {
  const navigate = useNavigate();
  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <div className="navbar navbar-expand-lg">
      <div className="container d-flex justify-content-around align-items-center">
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
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <section id="popover">
        <div
          className={`collapse navbar-collapse ${collapseOpen ? 'show' : ''}`}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <PopoverInfo />
            </li>
            <li className="nav-item">
              <PopoverCuenta />
            </li>
            <li className="nav-item">
              <PopoverSalir />
            </li>
          </ul>
        </div>
        </section>
      </div>
    </div>
  );
};

export default NavBarAdministracion;
