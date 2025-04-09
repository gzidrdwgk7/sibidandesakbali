import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Nav, Navbar, NavDropdown, Dropdown, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUserPlus, FaUsers, FaClipboardList, FaStethoscope, FaBaby, FaBookMedical, FaSyringe, FaBell, FaClock, FaAngleRight, FaTachometerAlt, FaSearch, FaUserCircle } from "react-icons/fa";
import profilePicture from "../../assets/img/profile-svgrepo-com.svg";
import PendaftaranolehBidan from "./PendaftaranolehBidan";
import { color } from "chart.js/helpers";

const DataPasien = () => {
  const [pasien, setPasien] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
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

  const primaryColor = '#e064ac';

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Nav
              className="flex-column p-3"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: sidebarOpen ? '255px' : '80px', // Toggle sidebar
                boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.2)', // Menambahkan shadow
                backgroundColor: '#FFFFF',
                overflowY: 'auto',
                transition: 'width 0.3s', // Transisi halus saat memperkecil atau memperbesar
              }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <h4 className="fw-bold mb-0" style={{ color: primaryColor }}>
              {sidebarOpen ? "Data Pasien" : ""}
            </h4>
          </div>
          <button
            className="btn btn-link"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ color: primaryColor, fontSize: "20px" }}
          >
            <FaBars />
          </button>
        </div>

        <Form className="mb-3">
          <InputGroup className="rounded-pill border">
            {sidebarOpen ? (
              <>
                <FormControl
                  type="text"
                  placeholder="Cari..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0"
                />
                <InputGroup.Text className="bg-transparent border-0" style={{ color: primaryColor }}>
                  <FaSearch />
                </InputGroup.Text>
              </>
            ) : (
              <InputGroup.Text className="bg-transparent border-0" style={{ color: primaryColor }}>
                <FaSearch />
              </InputGroup.Text>
            )}
          </InputGroup>
        </Form>
<Nav.Link
          as={Link}
          to="/dashboard-bidan"
          className="fw-semibold mb-3 pb-3 border-bottom"
          style={{ color: primaryColor }}
        >
          <FaTachometerAlt className="me-2" /> {sidebarOpen ? 'Dashboard Bidan' : ''}
        </Nav.Link>
        {/* Tombol Modal */}
        <Nav.Link onClick={() => setShowModal(true)} className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaUserPlus className="me-2" /> {sidebarOpen ? "Pendaftaran Pasien" : ""} 
        </Nav.Link>
<Nav.Link
          as={Link}
          to="/bidan/datapasien"
          className="fw-semibold mb-3 pb-3 border-bottom"
          style={{ color: primaryColor }}
        >
          <FaUsers className="me-2" /> {sidebarOpen ? 'Data Pasien' : ''}
        </Nav.Link>
       <Nav.Link
                 as={Link}
                 to="/bidan/antrianpasien"
                 className="fw-semibold mb-3 pb-3 border-bottom"
                 style={{ color: primaryColor }}
               >
                 <FaClock className="me-2" /> {sidebarOpen ? 'Antrian Pasien' : ''}
               </Nav.Link>
               <Nav.Link
                 as={Link}
                 to="/bidan/pemeriksaan"
                 className="fw-semibold mb-3 pb-3 border-bottom"
                 style={{ color: primaryColor }}
               >
                 <FaStethoscope className="me-2" /> {sidebarOpen ? 'Pemeriksaan' : ''}
               </Nav.Link>
               <Nav.Link
                 as={Link}
                 to="/bidan/persalinan"
                 className="fw-semibold mb-3 pb-3 border-bottom"
                 style={{ color: primaryColor }}
               >
                 <FaBaby className="me-2" /> {sidebarOpen ? 'Persalinan' : ''}
               </Nav.Link>
               <Nav.Link
                 as={Link}
                 to="/bidan/pasca-persalinan"
                 className="fw-semibold mb-3 pb-3 border-bottom"
                 style={{ color: primaryColor }}
               >
                 <FaBookMedical className="me-2" /> {sidebarOpen ? 'Pasca Persalinan' : ''}
               </Nav.Link>
               <Nav.Link
                 as={Link}
                 to="/bidan/laporan-rekam-medis"
                 className="fw-semibold mb-3 pb-3 border-bottom"
                 style={{ color: primaryColor }}
               >
                 <FaClipboardList className="me-2" /> {sidebarOpen ? 'Rekam Medis' : ''}
               </Nav.Link>
               <Nav.Link
                 as={Link}
                 to="/bidan/imunisasi-bayi"
                 className="fw-semibold mb-3 pb-3 border-bottom"
                 style={{ color: primaryColor }}
               >
                 <FaSyringe className="me-2" /> {sidebarOpen ? 'Imunisasi Bayi' : ''}
               </Nav.Link>
      </Nav>

      {/* Konten */}
      <div
             className="flex-grow-1 p-4"
             style={{
               backgroundColor: 'white',
               marginLeft: sidebarOpen ? '250px' : '80px',
               paddingBottom: '20px',
               height: '100vh',
               overflowY: 'scroll',
               transition: 'margin-left 0.3s',
             }}
           >
           <Navbar bg="white" className="mb-4 px-3 shadow-sm d-flex justify-content-between align-items-center rounded-3" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
           <FaBars className="d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)} />
           <Navbar.Brand className="fw-bold" style={{ color: primaryColor }}>Klik Bidan Desak</Navbar.Brand>
           <div className="d-flex align-items-center">
             <Dropdown align="end">
             <NavDropdown align="end" className="ms-4" title={<FaBell size={24} />} id="notifikasi-dropdown">
       <NavDropdown.Item href="#/action-1">Notifikasi 1: Pemberitahuan A</NavDropdown.Item>
       <NavDropdown.Item href="#/action-2">Notifikasi 2: Pemberitahuan B</NavDropdown.Item>
       <NavDropdown.Item href="#/action-3">Notifikasi 3: Pemberitahuan C</NavDropdown.Item>
     </NavDropdown>
             </Dropdown>
             <NavDropdown title={<FaUserCircle size={25} />} id="profile-dropdown" align="end" menuVariant="light" className="dropdown-menu-end ms-3">
               <NavDropdown.Item as={Link} to="/bidan/profil">Ubah Profil</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
             </NavDropdown>
           </div>
         </Navbar>

        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
            <Table striped bordered hover responsive>
            <thead style={{ textAlign: 'center' }} className="table-primary">
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

        {/* MODAL POP UP PENDAFTARAN PASIEN */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Pendaftaran Pasien Baru</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PendaftaranolehBidan />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default DataPasien;
