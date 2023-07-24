import React from 'react'
import PopoverInfo from './Popovers/PopoverInfo'
import PopoverCuenta from './Popovers/PopoverCuenta'
import '../styles/globalStyle.css'
import Logo from '../assets/images/Logo.png'

function Navbar() {
  // {

  //   const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  //   const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
  // }

  return (
    <>
      <PopoverCuenta/>
      <PopoverInfo/>
      </>
  ) 
}

export default Navbar