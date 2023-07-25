import React, { useState } from 'react';
import girl from '../assets/images/girl-cute-iniciar-sesion.jpg';
import { UilArrowRight } from '@iconscout/react-unicons'



const Login = () => {
const[usuario, setUsurio] = useState("")
const [contrasenia, setContrasenia] = useState("")


  return (
    <>

      <div className="container ">
        <div className="row justify-content-end">
        <div class="col-sm-5">
            <figure className='w-65 h-100 rounded-circle mx-auto overflow-hidden'
              style={{
                background: '#c9b7c7',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

              }}>
              <img className='img-fluid'
                src={girl}
                alt="Imagen del usuario"
                style={{
                  width: '70%',
                  borderRadius: '50%',
                }}
              />
            </figure>

          </div>
          <div className="col-md-6">
            <div className="form">

              <h2 className=" text-center" style={{
                color: '#c9b7c7',
              }}>Iniciar Sesión</h2>



              <div className="card-body">
                <form id="login-form" method="POST">
                  <div className="mb-3 mx-3">

                    <label htmlFor="email" className="label-custom">Email/Usuario</label>
                    <input type="email" className="form-control input-custom rounded-pill textarea" id="email" name="email"
                      placeholder="nombre@ejemplo.com / Nombre Usuario" required style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }}
                      value={usuario}
                      onChange={e => setUsurio(e.target.value)}
                    />

                  </div>
                  <div className="mb-3 mx-3">

                    <label htmlFor="password" className="label-custom">Contraseña</label>
                    <input type="password" className="form-control input-custom rounded-pill" id="password" name="password"
                      placeholder="Contraseña" required style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }}
                      value={contrasenia}
                      onChange={e => setContrasenia(e.target.value)}
                    />

                  </div>
                  <div className="form-check justify-content-center">
                    <input className="form-check-input" type="checkbox" id="gridCheck1" />
                    <label className="form-check-label" htmlFor="gridCheck1">
                      Acepto los términos y condiciones
                    </label>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-secondary btn-custom my-2 rounded-4" type="submit" id="submit-button" style={{ background: "#4d3147 " }} >Iniciar Sesión
                    < UilArrowRight size="30" color="#C9B7C7" />

                    </button >

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>);


};

export default Login;
