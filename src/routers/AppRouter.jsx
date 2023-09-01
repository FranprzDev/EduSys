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
import { InstContext } from '../context/InstitucionContext';
import CrearInst from '../components/modals/CrearInst';
import Redireccionar from '../components/Redireccionar';


function AppRouter() {
  const { jwt } = useContext(JwtContext);
  const { showModalError } = useContext(ErrorContext)
  const { showModalInst, openInstModal } = useContext(InstContext)
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
  
    if (storedToken) {
      navigate('/auth/');
    }
  }, []);

  useEffect(() => {
    if (showModalInst) {
      openInstModal();
    }
  }, [showModalInst]);

  return (
    <>
    {/* <Redireccionar/> */}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        {jwt.token !== undefined ? (
          <>
            <Route path="/auth//*" element={<AuthRouter />} /> 
            {/* <Route path="/auth/alumnos/" element={<AlumnosScreen />} />
            <Route path="/auth/alumnos/notas-cursado/*" element={<NotasAlumno />} /> */}
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

      {
        showModalInst && (
          <CrearInst/>
        )
      }
    </>
  )
}

export default AppRouter