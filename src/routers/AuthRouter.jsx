// -> Importaciones
import { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { JwtContext } from "../context/JwtContext";

// -> Páginas
import AdministracionScreen from "../pages/AdministradorScreen";
import AlumnosScreen from "../pages/AlumnosScreen";
import NotFoundScreen from "../pages/NotFoundScreen";
import NotasAlumno from "../pages/NotasAlumno";

function AuthRouter() {
  const { jwt } = useContext(JwtContext);

  return (
    <Routes>
      {/* AuthAdmin y AuthAlumnos */}
      {jwt.token !== undefined ? (
        <>
          <Route path="/*" element={<AdministracionScreen />} />
          <Route path="/alumnos/" element={<AlumnosScreen />} />
          <Route path="/alumnos/notas-cursado/*" element={<NotasAlumno />} />
        </>
      ) : (
        <>
          <Route
            path="/*"
            element={
              <NotFoundScreen mensajeError="¡Se produjo un error en el acceso a la Aplicación!" />
            }
          />
        </>
      )}
    </Routes>
  );
}

export default AuthRouter;
