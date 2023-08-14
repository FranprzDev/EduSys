import React, { useContext, useEffect } from 'react'
import JwtContext from "../../context/JwtContext";

import { UilTimesCircle } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom';

function PopoverSalir() {
  const { destroySession } = useContext(JwtContext);
  const navigate = useNavigate();

  const handleExitAccount = () => {
    destroySession();
    navigate('/login');
  }

  return (
    <button className='btn btn-outline text-gray popoverAdmin' 
    data-bs-container="body" 
    data-bs-toggle="popover" 
    data-bs-placement="bottom" 
    data-bs-trigger="focus"
    data-bs-content="Salir de tu cuenta"
    onClick={handleExitAccount}
    >
      <UilTimesCircle size="40" color="#C9B7C7"/>
    </button>
  )
}

export default PopoverSalir