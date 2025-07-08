import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PendaftaranolehBidan = () => {
  const [form, setForm] = useState({
    id: '',
    nama: '',
    whatsapp: '',
    layanan: '',
    keluhan: '',
    tanggal: '',
    jam: '',
  });

  const navigate = useNavigate();
  const primaryColor = "black";
  const [userType, setUserType] = useState('');

useEffect(() => {
  const storedUser = localStorage.getItem('userType');
  if (storedUser) {
    setUserType(storedUser); // hanya set, tidak paksa navigate
  }
}, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const semuaKosong = Object.values(form).every(value => value.trim() === '');
    if (semuaKosong) {
      alert('Data masih kosong, silakan isi terlebih dahulu.');
      return;
    }

    // Buat ID otomatis
    const existingAntrian = JSON.parse(localStorage.getItem('antrianPasien')) || [];
    const newId = `A${String(existingAntrian.length + 1).padStart(3, '0')}`;
    const newPatient = { ...form, id: newId };

    // Simpan ke antrianPasien (khusus Bidan)
    const updatedAntrian = [...existingAntrian, newPatient];
    localStorage.setItem('antrianPasien', JSON.stringify(updatedAntrian));

    // Simpan ke jadwalPasien (khusus Pasien)
    const existingJadwal = JSON.parse(localStorage.getItem('jadwalPasien')) || [];
    const updatedJadwal = [...existingJadwal, newPatient];
    localStorage.setItem('jadwalPasien', JSON.stringify(updatedJadwal));

    alert('Pasien berhasil didaftarkan!');

    // Arahkan sesuai peran
    if (userType === 'bidan') {
      navigate('/bidan/antrianpasien');
    } else if (userType === 'pasien') {
      navigate('/pasien/jadwalpasien');
    } else {
      navigate('/login'); // fallback
    }
  };

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px 30px',
    }}>
      <div style={{
        width: '1000%',
        maxWidth: '1000px',
        backgroundColor: '#fff',
      }}>
        <Form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Tulis Nama Lengkap di Sini"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Nomor WhatsApp</Form.Label>
                <div className="d-flex">
                  <Form.Select className="me-2" style={{ width: '30%' }} disabled>
                    <option value="+62">+62</option>
                  </Form.Select>
                  <Form.Control
                    type="text"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    pattern="[0-9]+"
                    placeholder="Tulis Nomor WA di Sini"
                  />
                </div>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Layanan</Form.Label>
            <Form.Select name="layanan" value={form.layanan} onChange={handleChange}>
              <option value="">Pilih Layanan</option>
              <option value="Pemeriksaan">Pemeriksaan</option>
              <option value="Persalinan">Persalinan</option>
              <option value="Pasca Persalinan">Pasca Persalinan</option>
              <option value="Imunisasi Bayi">Imunisasi Bayi</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Keluhan</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="keluhan"
              value={form.keluhan}
              onChange={handleChange}
              placeholder="Tulis Keluhan Anda di Sini"
            />
          </Form.Group>

          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Tanggal</Form.Label>
                <Form.Control
                  type="date"
                  name="tanggal"
                  value={form.tanggal}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Jam</Form.Label>
                <Form.Control
                  type="time"
                  name="jam"
                  value={form.jam}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row gap-3 mt-4">
            <Button
              type="submit"
              className="flex-grow-1"
              style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
            >
              Daftarkan Pasien
            </Button>
            <Button
              variant="outline-secondary"
              className="flex-grow-1"
              onClick={() => navigate(-1)}
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Kembali
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PendaftaranolehBidan;
