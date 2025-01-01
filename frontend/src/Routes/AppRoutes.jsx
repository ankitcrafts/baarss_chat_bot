// import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
// Import Screens
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;