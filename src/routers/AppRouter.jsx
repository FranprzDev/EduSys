//  -> Importaciones
import { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { JwtContext } from '../context/JwtContext';


// -> Páginas
import HomeScreen from "../pages/HomeScreen";
import LoginScreen from "../pages/LoginScreen";
import NotFoundScreen from '../pages/NotFoundScreen';
import DatosIncorrectos from '../components/modals/DatosIncorrectos';
import { ErrorContext } from '../context/ErrorContext';
import AuthRouter from './AuthRouter';
import { InstContext } from '../context/InstitucionContext';
import CrearInst from '../components/modals/CrearInst';


function AppRouter() {
  const { jwt } = useContext(JwtContext);
  const { showModalError } = useContext(ErrorContext)
  const { showModalInst, openInstModal } = useContext(InstContext)

  // Código para que redireccionar a la página de autenticado.
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  
  //   if (storedToken) {
  //     navigate('/auth/');
  //   }
  // }, []);

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