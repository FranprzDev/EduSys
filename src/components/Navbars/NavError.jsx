import React from "react";

import { UilHome } from "@iconscout/react-unicons";
import { Navigate, useNavigate } from "react-router";

const NavError = () => {
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
                src="../src/assets/Images/Logo.png"
                alt="Logo"
                style={{ height: "100px", width: "150px" }}
              />
            </button>
          </div>
          <div className="col d-flex justify-content-end align-items-center">
            <button
              className="btn"
              onClick={() => {
                navigate("/");
              }}
            >
              <UilHome size="50" color="#c9b7c7" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavError;
