import React from 'react'
import PopoverInfo from './Popovers/PopoverInfo'
import PopoverCuenta from './Popovers/PopoverCuenta'
import '../styles/globalStyle.css'
import 'bootstrap/dist/css/bootstrap.css'
import { UilHome } from '@iconscout/react-unicons'


function NavbarPrincipal() {
    // {

    //   const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    //   const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
    // }

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
            { /* <PopoverCuenta />
      <PopoverInfo />*/ }
        </>
    )
}

export default NavbarPrincipal