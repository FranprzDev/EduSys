import React from 'react';

import { UilHome } from '@iconscout/react-unicons'
//como hago que un boton me lleve a la pagina principal
const NavError = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <img src="../src/assets/Images/Logo.png" alt="Logo de EduSys" style={{ height: "100px", width: "150px" }} />

          </div>
          <div className='col d-flex justify-content-end align-items-center'>
            
            <button className='btn' onClick={() => {window.location.href = "/"}}><UilHome size="50" color="#c9b7c7" /></button>

          </div>
        </div>
      </div>
    </>
  );
};

export default NavError;
