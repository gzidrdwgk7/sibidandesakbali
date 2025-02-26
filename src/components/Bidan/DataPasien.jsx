import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import profilePicture from "../../assets/img/profile-svgrepo-com.svg";

const DataPasien = () => {
  const [pasien, setPasien] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dataPasien = JSON.parse(localStorage.getItem("dataPasien")) || [];
    setPasien(dataPasien);
  }, []);

  const logOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f4f6f9" }}>
      {/* Sidebar */}
      <Nav className="flex-column p-3 bg-dark text-white position-fixed vh-100 overflow-auto" style={{ width: "250px" }}>
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

      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
        {/* Navbar */}
        <Navbar bg="white" className="mb-4 px-3 shadow-sm d-flex justify-content-between align-items-center">
          <Navbar.Brand>Data Pasien</Navbar.Brand>
          <div className="position-relative">
            <NavDropdown
              title={<img src={profilePicture} alt="Profile" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />}
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

        {/* Konten */}
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <Table striped bordered hover>
                <thead className="table-primary">
                  <tr>
                    <th>Nama</th>
                    <th>Nomor WA</th>
                    <th>History Layanan</th>
                  </tr>
                </thead>
                <tbody>
                  {pasien.map((data, index) => (
                    <tr key={index}>
                      <td>{data.nama}</td>
                      <td>{data.nomorWA}</td>
                      <td>
                        <ul>
                          <li>
                            <strong>Pemeriksaan:</strong> {data.layanan} <br />
                            <strong>Keluhan:</strong> {data.keluhan}
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DataPasien;