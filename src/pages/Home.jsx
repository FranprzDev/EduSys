import React from 'react'
import Contactanos from '../components/Contactanos'
import InicioHome from '../components/InicioHome'
import Navbar from '../components/Navbar'


function Home() {
  return (
    <>

      <Navbar/>
      <InicioHome />
      <Contactanos />
    </>
  )
}

export default Home