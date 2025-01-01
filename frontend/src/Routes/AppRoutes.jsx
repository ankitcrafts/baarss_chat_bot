// import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Login from '../screens/Login';
import Register from '../screens/Register';

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;