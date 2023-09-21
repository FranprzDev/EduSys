import React, { useContext, useEffect } from 'react'
import { UilUser } from '@iconscout/react-unicons'
import { InstContext } from '../../context/InstitucionContext';
import { Popover } from 'bootstrap';

function PopoverInfo() {
  const { nombreInst, mailInst, celularInst } = useContext(InstContext);
  useEffect(() => {
    Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]'))
      .forEach(popoverNode => new Popover(popoverNode))
  })


  return (
    <button className='btn btn-outline text-gray popoverAdmin' 
    data-bs-container="body" 
    data-bs-toggle="popover" 
    data-bs-placement="bottom" 
    data-bs-trigger="hover focus"
    title='Institución'
    data-bs-content={`Nombre: ${nombreInst} Correo: ${mailInst} Celular: ${celularInst}`}
    >
      <UilUser size="40" color="#C9B7C7"/>
    </button>
  )
}

export default PopoverInfo