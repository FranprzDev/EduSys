import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthRouter from './AuthRouter'


import Home from "../pages/Home";
import Login from "../pages/Login";
import Error from "../pages/NotFound";


function AppRouter() {
  return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/auth/*" element={<AuthRouter />} />
            <Route path="/*" element={<Error />} />
        </Routes>
  )
}

export default AppRouter