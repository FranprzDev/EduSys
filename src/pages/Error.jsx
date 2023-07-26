import React from 'react'
import NavError from '../components/Navbars/NavError'

function Error() {
  return (
    <>
      <NavError/>
      <div className="container text-center">
        <div className="row">
          <div className="d-flex flex-column justify-content-center align-items-center col min-vh-100">
            <img src="src\assets\images\404-conejo.jpeg" className="img-fluid rounded-5" alt="Error-404-Funny-Bunny" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Error