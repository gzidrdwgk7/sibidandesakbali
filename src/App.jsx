import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DashboardBidan from './components/DashboardBidan';
import DashboardPasien from './components/DashboardPasien';
import PendaftaranolehBidan from "./components/Bidan/PendaftaranolehBidan";
import DataPasien from './components/Bidan/DataPasien';
import AntrianPasien from './components/Bidan/AntrianPasien';

const App = () => {
  useEffect(() => {
    // Menghapus class apapun dari body ketika aplikasi dimuat
    document.body.className = '';  

    // Menambahkan class khusus hanya pada halaman login dan register
    if (window.location.pathname === '/' || window.location.pathname === '/register') {
      document.body.classList.add('login-register-background');
    }

    return () => {
      // Menghapus class ketika komponen di-unmount (misalnya saat berpindah halaman)
      document.body.classList.remove('login-register-background');
    };
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
          path="/bidan/pendaftaranolehbidan" 
          element={<PendaftaranolehBidan />}
        />
         <Route 
          path="bidan/datapasien" 
          element={<DataPasien />} 
        />
        <Route 
          path="/bidan/antrianpasien" 
          element={<AntrianPasien />}
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
