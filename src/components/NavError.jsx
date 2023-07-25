import React from 'react';

import { UilHome } from '@iconscout/react-unicons'

const NavError = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <img src="../src/assets/Images/Logo.png" alt="Logo" style={{ height: "100px", width: "150px" }} />

          </div>
          <div className='col d-flex justify-content-end align-items-center'>
            <UilHome size="50" color="#c9b7c7" />

          </div>
        </div>
      </div>
    </>
  );
};

export default NavError;
