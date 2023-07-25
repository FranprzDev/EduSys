import React from 'react'
import PopoverInfo from './Popovers/PopoverInfo'
import PopoverCuenta from './Popovers/PopoverCuenta'
import '../styles/globalStyle.css'
import 'bootstrap/dist/css/bootstrap.css'

function Navbar() {
  // {

  //   const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  //   const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
  // }

  return (
    <>
    
      <div className='d-flex justify-content-evenly align-items-center'>
        <img src="../src/assets/Images/Logo.png" alt="Logo" style={{ height: "100px", width: "150px" }} />
        <button className='btn text-white rounded-4 h-50 ' style={{ background: "#4d3147 " }}>Iniciar Sesión</button>
      </div>
      { /* <PopoverCuenta />
      <PopoverInfo />*/ }
    </>
  )
}

export default Navbar