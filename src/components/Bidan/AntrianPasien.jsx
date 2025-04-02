import React from 'react';
import { Container, Row, Col, Card, Nav, Navbar, NavDropdown, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import profilePicture from '../../assets/img/profile-svgrepo-com.svg';

const AntrianPasien = () => {
  const navigate = useNavigate();

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
        <Nav.Link as={Link} to="/bidan/datapasien" className="text-white">Data Pasien</Nav.Link>
        <Nav.Link as={Link} to="/bidan/antrianpasien" className="text-white">Antrian Pasien</Nav.Link>
        <Nav.Link as={Link} to="/bidan/pemeriksaan" className="text-white">Pemeriksaan</Nav.Link>
        <Nav.Link as={Link} to="/bidan/persalinan" className="text-white">Persalinan</Nav.Link>
        <Nav.Link as={Link} to="/bidan/pasca-persalinan" className="text-white">Pasca Persalinan</Nav.Link>
        <Nav.Link as={Link} to="/bidan/laporan-rekam-medis" className="text-white">Laporan Rekam Medis</Nav.Link>
        <Nav.Link as={Link} to="/bidan/imunisasi-bayi" className="text-white">Imunisasi Bayi</Nav.Link>
      </Nav>

      <div className="flex-grow-1 p-4" style={{ marginLeft: '250px' }}>
        <Navbar bg="white" className="mb-4 px-3 shadow-sm d-flex justify-content-between align-items-center">
          <Navbar.Brand>Antrian Pasien</Navbar.Brand>
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
              <h4 className="mb-3 text-center">Daftar Antrian Pasien</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Layanan</th>
                    <th>Tanggal</th>
                    <th>Waktu</th>
                    <th>Keluhan</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>A1</td>
                    <td>Niken Peler</td>
                    <td>Pemeriksaan</td>
                    <td>2025-04-02</td>
                    <td>10:00 AM</td>
                    <td>Sakit kepala</td>
                    <td>Menunggu</td>
                  </tr>
                  <tr>
                    <td>A2</td>
                    <td>Niken Raja Stupdi</td>
                    <td>Persalinan</td>
                    <td>2025-04-02</td>
                    <td>10:30 AM</td>
                    <td>Kontraksi intens</td>
                    <td>Menunggu</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AntrianPasien;
