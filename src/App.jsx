import React from "react"
import { BrowserRouter, Routes , Route } from "react-router-dom"
import somosnosotros from "./pages/somosnosotros"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
    
  )
  
}

export default App
