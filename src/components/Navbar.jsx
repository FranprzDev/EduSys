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
      <div>
        <img src="../src/assets/Images/Logo.png" alt="Logo" style={{ height: "100px", width: "150px" }} />
        <button className=''></button>
        <UilInfoCircle size="40" color="#C9B7C7" />
      </div>
      <PopoverCuenta />
      <PopoverInfo />
    </>
  )
}

export default Navbar