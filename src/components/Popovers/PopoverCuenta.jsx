// import React, { useEffect } from 'react'
import { UilInfoCircle } from '@iconscout/react-unicons'
import { Popover } from 'bootstrap'
import { useEffect } from 'react'

function PopoverCuenta() {
  useEffect(() => {
    Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]'))
      .forEach(popoverNode => new Popover(popoverNode))
  })

  return (
    <>
    <button className='btn btn-outline text-gray popoverAdmin'
      data-bs-container="body" 
      data-bs-toggle="popover" 
      data-bs-placement="bottom" 
      data-bs-trigger="hover focus"
      title='Cuenta de administrador'
      >
      <UilInfoCircle size="40" color="#C9B7C7" />
    </button>

    </>
    
  )
}

export default PopoverCuenta