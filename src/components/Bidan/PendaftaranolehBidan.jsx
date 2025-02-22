import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Navbar, NavDropdown, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import profilePicture from '../../assets/img/profile-svgrepo-com.svg';

const PendaftaranolehBidan = () => {
  const [form, setForm] = useState({
    nama: "",
    whatsapp: "",
    layanan: "",
    keluhan: "",
    
    tanggal: "",
    jam: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Pendaftaran:", form);
  };

  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f4f6f9' }}>
      <Nav className="flex-column p-3 bg-dark text-white position-fixed vh-100 overflow-auto" style={{ width: '250px' }}>
        <h4 className="text-center">Klik Bidan Desak</h4>
        <Nav.Link as={Link} to="/bidan/pendaftaranolehbidan" className="text-white">Pendaftaran Pasien</Nav.Link>
        <Nav.Link as={Link} to="/bidan/pemeriksaan" className="text-white">Pemeriksaan</Nav.Link>
        <Nav.Link as={Link} to="/bidan/persalinan" className="text-white">Persalinan</Nav.Link>
        <Nav.Link as={Link} to="/bidan/pasca-persalinan" className="text-white">Pasca Persalinan</Nav.Link>
        <Nav.Link as={Link} to="/bidan/laporan-rekam-medis" className="text-white">Laporan Rekam Medis</Nav.Link>
        <Nav.Link as={Link} to="/bidan/imunisasi-bayi" className="text-white">Imunisasi Bayi</Nav.Link>
      </Nav>

      <div className="flex-grow-1 p-4" style={{ marginLeft: '250px' }}>
        <Navbar bg="white" className="mb-4 px-3 shadow-sm d-flex justify-content-between align-items-center">
          <Navbar.Brand>Pendaftaran Pasien</Navbar.Brand>
          <div className="position-relative">
            <NavDropdown
              title={<img src={profilePicture} alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />} 
              id="profile-dropdown"
              align="end"
              menuVariant="light"
              className="dropdown-menu-end"
            >
              <NavDropdown.Item as={Link} to="/bidan/profil">Ubah Profil</NavDropdown.Item>
              <NavDropdown.Item href="#notifikasi">Notifikasi</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar>

        <Row className="justify-content-center">
          <Col md={10} lg={10}>
            <Card className="shadow-lg p-4 border-0 rounded-4" style={{ backgroundColor: '#ffffff' }}>
              <h4 className="mb-3 text-center">Form Pendaftaran</h4>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama</Form.Label>
                      <Form.Control type="text" name="nama" value={form.nama} onChange={handleChange} placeholder='Tulis Nama Lengkap di Sini' required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nomor WhatsApp</Form.Label>
                      <div className="d-flex">
                        <Form.Select className="me-2" style={{ width: '35%' }}>
                          <option value="+62">+62 (ID)</option>
                          <option value="+1">+1 (US)</option>
                          <option value="+91">+91 (IN)</option>
                        </Form.Select>
                        <Form.Control type="text" name="whatsapp" value={form.whatsapp} onChange={handleChange} pattern="[0-9]+" placeholder='Tulis Nomor WA di Sini' required />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Layanan</Form.Label>
                  <Form.Select name="layanan" value={form.layanan} onChange={handleChange} required>
                    <option value="">Pilih Layanan</option>
                    <option value="Pemeriksaan">Pemeriksaan</option>
                    <option value="Persalinan">Persalinan</option>
                    <option value="Pasca Persalinan">Pasca Persalinan</option>
                    <option value="Imunisasi Bayi">Imunisasi Bayi</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Keluhan</Form.Label>
                  <Form.Control as="textarea" rows={3} name="keluhan" value={form.keluhan} onChange={handleChange} placeholder='Tulis Keluhan Anda di Sini' required />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tanggal</Form.Label>
                      <Form.Control type="date" name="tanggal" value={form.tanggal} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Jam</Form.Label>
                      <Form.Control type="time" name="jam" value={form.jam} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit" className="w-100 btn-dark">Daftarkan Pasien</Button>
              </Form>
              <Button variant="outline-secondary" className="w-100 mt-3">Lihat Jadwal Terkini</Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PendaftaranolehBidan;