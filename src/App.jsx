import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DashboardBidan from './components/DashboardBidan';
import DashboardPasien from './components/DashboardPasien';
import PendaftaranolehBidan from "./components/Bidan/PendaftaranolehBidan";
import AntrianPasien from './components/Bidan/AntrianPasien';
import KalenderAntrianPasien from './components/Bidan/KalenderAntrianPasien';
import Pemeriksaan from './components/Bidan/Pemeriksaan';
import Persalinan from './components/Bidan/Persalinan';
import PascaPersalinan from './components/Bidan/PascaPersalinan';
import ImunisasiBayi from './components/Bidan/ImunisasiBayi';
import RekamMedis from './components/Bidan/LaporanRekamMedis';
import PenjadwalanPasien from './components/Pasien/PenjadwalanPasien';
import JadwalPasien from './components/Pasien/JadwalPasien';
import RiwayatRekamMedis from './components/Pasien/RiwayatRekamMedis.jsx';


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
          path="/bidan/antrianpasien" 
          element={<AntrianPasien />} 
        />
        <Route 
          path="/bidan/pemeriksaan" 
          element={<Pemeriksaan />} 
        />
        <Route 
          path="/dashboard-pasien" 
          element={<DashboardPasien />} 
        />
       <Route 
       path="/bidan/persalinan" 
       element={<Persalinan />} 
       />
       <Route 
       path="/bidan/pasca-persalinan" 
       element={<PascaPersalinan />} 
       />
        <Route 
          path="/bidan/kalenderantrianpasien" 
          element={<KalenderAntrianPasien />} 
        />
        <Route 
          path="/bidan/laporan-rekam-medis" 
          element={<RekamMedis  />} 
        />
         <Route path="/bidan/imunisasi-bayi" 
         element={<ImunisasiBayi />} 
         />
          <Route path="/pasien/penjadwalan-pasien" 
         element={<PenjadwalanPasien />} 
         />
         <Route path="/pasien/jadwalpasien"
         element={<JadwalPasien />}
         />
          <Route path="/pasien/riwayat-rekam-medis"
         element={<RiwayatRekamMedis />}
         />
      </Routes>
      
    </div>
    
  );
};

export default App;