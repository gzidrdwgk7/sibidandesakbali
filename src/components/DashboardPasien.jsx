import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import profilePicture from '../assets/img/profile-svgrepo-com.svg'; //

const DashboardPasien = () => {
  const navigate = useNavigate();
  const logOut = () => {
    // Hapus data login dari localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    // Arahkan pengguna ke halaman login
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">Dashboard Pasien Klik Bidan Desak</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/pasien/jadwalkan-konsultasi">
                Jadwalkan Konsultasi
              </Nav.Link>
              <Nav.Link as={Link} to="/pasien/riwayat-rekam-medis">
                Riwayat Rekam Medis
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                title={
                  <img
                    src={profilePicture}
                    alt="Profile Picture"
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                    }}
                  />
                }
                id="profile-dropdown"
              >
                <NavDropdown.Item as={Link} to="/pasien/profil">
                  Ubah Profil
                </NavDropdown.Item>
                <NavDropdown.Item href="#notifikasi">
                  Notifikasi
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default DashboardPasien;
