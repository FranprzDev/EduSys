import React from "react"
import { BrowserRouter, Routes , Route } from "react-router-dom"
import Administracion from "./pages/Administrador"
import Home from "./pages/Home"
import Alumnos from "./pages/Alumnos"
import Footer from './components/Footer'
import Login from "./pages/Login"
import Error from "./pages/Error"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="administracion" element={<Administracion/>}/>
          <Route path="alumnos" element={<Alumnos/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
    
  )
  
}

export default App
