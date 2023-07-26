import React from 'react'

function Navbar() {
  return (
    <>

      <div className='container'>
        <div className='row'>
          <div className='col'>
            <img src="../src/assets/Images/Logo.png" alt="Logo" style={{ height: "100px", width: "150px" }} />
          </div>
          <div className='col d-flex justify-content-end align-items-center'>
            <button className='btn text-white rounded-4 h-50 ' onClick={() => {window.location.href = "/login";}} style={{ background: "#4d3147 " }}>Iniciar Sesión</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default Navbar