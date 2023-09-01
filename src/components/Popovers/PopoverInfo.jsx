import React, { useContext, useEffect } from 'react'
import { UilUser } from '@iconscout/react-unicons'
import { InstContext } from '../../context/InstitucionContext';

function PopoverInfo() {
  const { nombreInst, mailInst, celularInst } = useContext(InstContext);
  useEffect(() => {
    // Activa los popovers en los elementos con clase 'popoverAdmin' al montar el componente
    const popoverTriggerList = [].slice.call(document.querySelectorAll('.popoverAdmin'));
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new window.bootstrap.Popover(popoverTriggerEl, {
        container: 'body'
      });
    });
  }, []);

  return (
    <button className='btn btn-outline text-gray popoverAdmin' 
    data-bs-container="body" 
    data-bs-toggle="popover" 
    data-bs-placement="bottom" 
    data-bs-trigger="hover focus"
    data-bs-content={`Nombre: ${nombreInst} Correo: ${mailInst} Celular: ${celularInst}`}
    >
      <UilUser size="40" color="#C9B7C7"/>
    </button>
  )
}

export default PopoverInfo