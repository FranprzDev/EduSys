import React, { useEffect } from 'react'
import { UilTimesCircle } from '@iconscout/react-unicons'

function PopoverSalir() {
  useEffect(() => {
    // Activa los popovers en los elementos con clase 'popoverAdmin' al montar el componente
    const popoverTriggerList = [].slice.call(document.querySelectorAll('.popoverAdmin'));
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new window.bootstrap.Popover(popoverTriggerEl, {
        container: 'body'
      });
    });
  }, []);

  const handleExitAccount = () => {
    window.location.href = "/"
    // + toda la lógica de salida (backend)
  }
  return (
    <button className='btn btn-outline text-gray popoverAdmin' 
    data-bs-container="body" 
    data-bs-toggle="popover" 
    data-bs-placement="bottom" 
    data-bs-trigger="hover focus"
    data-bs-content="Salir de tu cuenta"
    onClick={handleExitAccount}
    >
      <UilTimesCircle size="40" color="#C9B7C7"/>
    </button>
  )
}

export default PopoverSalir