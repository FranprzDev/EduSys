import React from 'react';
import { useNavigate } from 'react-router';
import LogoImage from '../../assets/images/Logo.png';

function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <button className="btn btn-outline text-gray rounded-4" onClick={() => navigate("/")}>
              <img src={LogoImage} alt="Logo" style={{ height: "100px", width: "150px" }} />
            </button>
          </div>
          <div className='col d-flex justify-content-end align-items-center'>
            <button className='btn text-white rounded-4 h-50' onClick={() => navigate("/login")} style={{ background: "#4d3147" }}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
