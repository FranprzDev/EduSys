import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer'
import Administracion from './components/Administracion.jsx'
// También dejo comentada las rutas que no se utilizarán
// import Error from './pages/Error.jsx'
// import Contactanos from './components/Contactanos.jsx'

function App() {

  return (
    <>
    {/* Ojo aquí dejo comentado las cosas para probarlas, pero además de eso aún falta utilziar REACT-ROUTER para poder dejarlo bien */}
      <Navbar/>   
      <Administracion/> 
      {/* <Contactanos/> */}
      {/* <Error/> */}
      <Footer/>
    </>
    
  )
  
}

export default App
