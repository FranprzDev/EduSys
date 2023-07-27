import React, { useContext, useEffect } from 'react'
import JwtContext from "../JwtContext";

import { UilTimesCircle } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom';

function PopoverSalir() {
  const { destroySession } = useContext(JwtContext);
  const navigate = useNavigate();

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
    destroySession()
    navigate('/login')
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