import React from 'react'
import PopoverInfo from './Popovers/PopoverInfo'
import PopoverCuenta from './Popovers/PopoverCuenta'

function Navbar() {
  // {

  //   const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  //   const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
  // }

  return (
    <>
      <div>Navbar</div>
      <PopoverCuenta/>
      <PopoverInfo/>
    </>
  )
}

export default Navbar