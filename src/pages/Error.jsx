import React from 'react'
import NavError from '../components/Navbars/NavError'

function Error({ mensajeError = "" }) {
  return (
    <>
      <NavError/>
      <div className="container text-center">
        <div className="row">
          <div className="d-flex flex-column justify-content-center align-items-center col min-vh-100">
            <h1>{mensajeError}</h1>
            <img src="src\assets\images\404-conejo.jpeg" className="img-fluid rounded-5" alt="Error-404-Funny-Bunny" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Error