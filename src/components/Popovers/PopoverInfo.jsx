import React, { useEffect } from 'react'

function PopoverInfo() {
  useEffect(() => {
    // Activa los popovers en los elementos con clase 'example-popover' al montar el componente
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
    data-bs-content="Institución"
    >
        <span><i className="bi bi-info-circle"></i></span>
    </button>
  )
}

export default PopoverInfo