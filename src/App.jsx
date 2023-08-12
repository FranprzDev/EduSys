import React from "react"
import { BrowserRouter, Routes , Route } from "react-router-dom"
import Home from "./pages/somosnosotros"
import Footer from './components/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
         
        
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
    
  )
  
}

export default App