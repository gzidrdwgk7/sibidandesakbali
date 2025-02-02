// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DashboardBidan from './components/DashboardBidan';
import DashboardPasien from './components/DashboardPasien';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard-bidan" element={<DashboardBidan />} />
        <Route path="/dashboard-pasien" element={<DashboardPasien />} />
      </Routes>
    </div>
  );
};

export default App;
