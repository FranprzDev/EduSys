//  -> Importaciones
import { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { JwtContext } from '../context/JwtContext';


// -> Páginas
import HomeScreen from "../pages/HomeScreen";
import LoginScreen from "../pages/LoginScreen";
import AdministradorScreen from '../pages/AdministradorScreen';
import NotFoundScreen from '../pages/NotFoundScreen';
import AlumnosScreen from '../pages/AlumnosScreen';
import DatosIncorrectos from '../components/modals/DatosIncorrectos';
import { ErrorContext } from '../context/ErrorContext';
import AuthRouter from './AuthRouter';
import NotasAlumno from '../pages/NotasAlumno';


function AppRouter() {
  const { jwt } = useContext(JwtContext);
  const { showModalError } = useContext(ErrorContext)
  const navigate = useNavigate();

  // Verificar si ya hay un token en el almacenamiento local
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Proceso de decodificación del token
      const payloadBase64 = storedToken.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));

      const currentTime = Date.now();
      if (payload.exp * 1000 > currentTime) {
        if (!location.pathname.startsWith('/auth/')) {
          navigate('/auth/');
        }
      }
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        {jwt.token !== undefined ? (
          <>
          {/* tengo que pasar el /auth/* */}
            <Route path="/auth/" element={<AuthRouter />} /> 
            <Route path="/auth/alumnos/" element={<AlumnosScreen />} />
            <Route path="/auth/alumnos/notas-cursado/*" element={<NotasAlumno />} />
          </>
        ) : (
          <Route path="/auth/*" element={<NotFoundScreen mensajeError="¡Se produjo un error en el acceso a la Aplicación!" />} />
        )}
        <Route path="/*" element={<NotFoundScreen />} />
      </Routes>
      {
        showModalError && (
          <DatosIncorrectos/>
        ) 
      }
    </>
  )
}

export default AppRouter