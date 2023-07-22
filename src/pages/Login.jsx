import React from 'react';

const Login = () => {
  return (
    <div className="container">
      <div className="row justify-content-end">
        <div className="col-md-6">
          <div className="form">

            <h2 className="my-2 text-center">Iniciar Sesión</h2>

            <div className="card-body">
              <form id="login-form" method="POST">
                <div className="mb-3 mx-3">

                  <label htmlFor="email" className="label-custom">Email</label>
                  <input type="email" className="form-control input-custom rounded-pill textarea" id="email" name="email"
                    placeholder="nombre@ejemplo.com" required />

                </div>
                <div className="mb-3 mx-3">

                  <label htmlFor="password" className="label-custom">Contraseña</label>
                  <input type="password" className="form-control input-custom rounded-pill" id="password" name="password"
                    placeholder="Contraseña" required />

                </div>
                <div className="mb-3 mx-3">

                  <label htmlFor="confirmPassword" className="label-custom">Repetir Contraseña</label>
                  <input type="password" className="form-control input-custom rounded-pill " id="confirmPassword" name="confirmPassword"
                    placeholder="Repetir Contraseña" required />

                </div>
                <div className="form-check justify-content-center">
                  <input className="form-check-input" type="checkbox" id="gridCheck1" />
                  <label className="form-check-label" htmlFor="gridCheck1">
                    Acepto los términos y condiciones
                  </label>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary btn-custom my-2 rounded-pill" type="submit" id="submit-button">Enviar</button>
                  <i className="bi bi-arrow-right"></i>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
