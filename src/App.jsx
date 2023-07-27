import React, { useEffect, useState } from "react";
import JwtContext from "./components/JwtContext";

import jwtDecode from "jwt-decode";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Administracion from "./pages/Administrador";
import Home from "./pages/Home";
import Alumnos from "./pages/Alumnos";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Error from "./pages/Error";

function App() {
  const [jwt, setJwt] = useState({
    email: '',
    jwt: ''
  });

  return (
    <JwtContext.Provider value={{jwt, setJwt}}>
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route
              path="administracion"
              element={<Administracion show={jwt.length > 0} />}
            />
            <Route path="alumnos" element={<Alumnos />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </>
    </JwtContext.Provider>
  );
}

export default App;
