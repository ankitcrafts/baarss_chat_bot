// import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<div>Login</div>} />
      <Route path="/Register" element={<div>Register</div>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;