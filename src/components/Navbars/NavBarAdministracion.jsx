import React from 'react';
import { UilTimesCircle } from '@iconscout/react-unicons'
import PopoverInfo from '../Popovers/PopoverInfo';
import PopoverCuenta from '../Popovers/PopoverCuenta';
import PopoverSalir from '../Popovers/PopoverSalir';

const NavBarAdministracion = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <img src="../src/assets/Images/Logo.png" alt="Logo" style={{ height: "100px", width: "150px" }} />

          </div>
          <div className='col d-flex justify-content-end align-items-center'>
            <PopoverInfo/>
            <PopoverCuenta/>
            <PopoverSalir/>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarAdministracion;