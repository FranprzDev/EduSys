import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Administracion from "../pages/Administrador";
import Alumnos from "../pages/Alumnos";
import { JwtContext } from "../components/JwtContext";
import NotFound from "../pages/NotFound";

function AuthRouter() {
  const { jwt } = useContext(JwtContext);

  return (
    <Routes>
      {/* AuthAdmin y AuthAlumnos */}
      {jwt.token !== undefined ? (
        <>
          <Route path="/" element={<Administracion />} />
          <Route path="/alumnos" element={<Alumnos />} />
        </>
      ) : (
        <>
          <Route
            path="/*"
            element={
              <NotFound mensajeError="¡Se produjo un error en el acceso a la Aplicación!" />
            }
          />
        </>
      )}
    </Routes>
  );
}

export default AuthRouter;
