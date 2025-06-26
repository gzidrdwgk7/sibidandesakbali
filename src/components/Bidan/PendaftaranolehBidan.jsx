import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const PendaftaranolehBidan = () => {
  const [form, setForm] = useState({
    id: "",
    nama: "",
    whatsapp: "",
    layanan: "",
    keluhan: "",
    tanggal: "",
    jam: "",
  });

  const navigate = useNavigate();
  const primaryColor = '#e064ac';

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

  const existingData = JSON.parse(localStorage.getItem('antrianPasien')) || [];
  const newId = `A${String(existingData.length + 1).padStart(3, '0')}`;
  const newPatient = { ...form, id: newId };
  existingData.push(newPatient);
  localStorage.setItem('antrianPasien', JSON.stringify(existingData));

  alert('Pasien berhasil didaftarkan!');
  navigate('/bidan/antrianpasien');
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
        maxWidth: '1000px', // <- Ini bikin form jadi melebar
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
                  <Form.Select className="me-2" style={{ width: '30%' }}>
                    <option value="+62">+62</option>
                    <option value="+1">+1</option>
                    <option value="+91">+91</option>
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
            <Form.Select name="layanan" value={form.layanan} onChange={handleChange} >
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
                <Form.Control type="date" name="tanggal" value={form.tanggal} onChange={handleChange}  />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Jam</Form.Label>
                <Form.Control type="time" name="jam" value={form.jam} onChange={handleChange}  />
              </Form.Group>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row gap-3 mt-4">
            <Button
  type="button" // dari "submit" jadi "button"
  className="flex-grow-1"
  style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
  onClick={handleSubmit} // panggil fungsi manual
>
  Daftarkan Pasien
</Button>


            <Button
              variant="outline-secondary"
              className="flex-grow-1"
              as={Link}
              to="/bidan/antrianpasien"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Lihat Jadwal Terkini
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PendaftaranolehBidan;