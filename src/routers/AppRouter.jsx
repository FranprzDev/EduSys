//  -> Importaciones
import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AuthRouter from './AuthRouter'
import { JwtContext } from '../context/JwtContext';


// -> Páginas
import HomeScreen from "../pages/HomeScreen";
import LoginScreen from "../pages/LoginScreen";
import AdministradorScreen from '../pages/AdministradorScreen';
import NotFoundScreen from '../pages/NotFoundScreen';
import AlumnosScreen from '../pages/AlumnosScreen';


function AppRouter() {
  const { jwt } = useContext(JwtContext);
  const navigate = useNavigate();

  // Verificar si ya hay un token en el almacenamiento local
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Proceso de decodificación del token
      const payloadBase64 = storedToken.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      const decodedToken = payload.iat; 

      const tokenExpiration = decodedToken * 10000;
      const currentTime = Date.now();

      if (tokenExpiration > currentTime) {
        if (!location.pathname.startsWith('/auth/')) {
          navigate('/auth/');
        }
      }
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      {jwt.token !== undefined ? (
        <>
          <Route path="/auth/" element={<AdministradorScreen />} />
          <Route path="/auth/alumnos" element={<AlumnosScreen />} />
        </>
      ) : (
        <Route path="/auth/*" element={<NotFoundScreen mensajeError="¡Se produjo un error en el acceso a la Aplicación!" />} />
      )}
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default AppRouter