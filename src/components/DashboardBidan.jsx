import React from 'react';
import { Container, Row, Col, Card, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import profilePicture from '../assets/img/profile-svgrepo-com.svg';

const DashboardBidan = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      {/* Sidebar */}
      <Nav className="flex-column p-3 bg-dark text-white vh-100 d-none d-md-block" style={{ width: '250px' }}>
        <h4 className="text-center">Klik Bidan Desak</h4>
        <Nav.Link as={Link} to="/bidan/pendaftaranolehbidan" className="text-white">
          Pendaftaran Pasien
        </Nav.Link>
        <Nav.Link as={Link} to="/bidan/pemeriksaan" className="text-white">
          Pemeriksaan
        </Nav.Link>
        <Nav.Link as={Link} to="/bidan/persalinan" className="text-white">
          Persalinan
        </Nav.Link>
        <Nav.Link as={Link} to="/bidan/pasca-persalinan" className="text-white">
          Pasca Persalinan
        </Nav.Link>
        <Nav.Link as={Link} to="/bidan/laporan-rekam-medis" className="text-white">
          Laporan Rekam Medis
        </Nav.Link>
        <Nav.Link as={Link} to="/bidan/imunisasi-bayi" className="text-white">
          Imunisasi Bayi
        </Nav.Link>
      </Nav>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f4f6f9' }}>
        {/* Header */}
        <Navbar bg="white" className="mb-4 px-3 shadow-sm">
          <Navbar.Brand>Dashboard Bidan</Navbar.Brand>
          <Nav className="ms-auto">
            <NavDropdown
              title={<img src={profilePicture} alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />}
              id="profile-dropdown"
            >
              <NavDropdown.Item as={Link} to="/bidan/profil">Ubah Profil</NavDropdown.Item>
              <NavDropdown.Item href="#notifikasi">Notifikasi</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="shadow-lg text-center p-4 border-0" style={{ backgroundColor: '#ffffff' }}>
              <h5>Total Pasien</h5>
              <h2 className="text-dark">-</h2>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="shadow-lg text-center p-4 border-0" style={{ backgroundColor: '#ffffff' }}>
              <h5>Pasien Hari Ini</h5>
              <h2 className="text-dark">-</h2>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="shadow-lg text-center p-4 border-0" style={{ backgroundColor: '#ffffff' }}>
              <h5>Jadwal Imunisasi</h5>
              <h2 className="text-dark">-</h2>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardBidan;
