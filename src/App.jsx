import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DashboardBidan from './components/DashboardBidan';
import DashboardPasien from './components/DashboardPasien';

const App = () => {
  useEffect(() => {
    // Menghapus class apapun dari body ketika aplikasi dimuat
    document.body.className = '';  
  }, []);

  return (
    <div>
      <Routes>
        <Route 
          path="/" 
          element={<Login />} 
        />
        <Route 
          path="/register" 
          element={<Register />} 
        />
        <Route 
          path="/dashboard-bidan" 
          element={<DashboardBidan />} 
        />
        <Route 
          path="/dashboard-pasien" 
          element={<DashboardPasien />} 
        />
      </Routes>
    </div>
  );
};

export default App;
