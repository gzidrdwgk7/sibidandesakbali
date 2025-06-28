import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Nav, Navbar, NavDropdown, Form, FormControl, InputGroup, Table, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import PendaftaranolehBidan from '../Bidan/PendaftaranolehBidan';
import { FaBars,FaUserPlus,FaUsers,FaClipboardList,FaStethoscope,FaBaby,FaBookMedical,FaSyringe,FaBell,FaClock,FaAngleRight,FaTachometerAlt,FaSearch,FaUserCircle} from 'react-icons/fa';

const JadwalPasien = () => {
  const navigate = useNavigate();
  const [jadwalPasien, setJadwalPasien] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [status, setStatus] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('jadwalPasien')) || [];
setJadwalPasien(data);


    const initialStatus = {};
    data.forEach((pasien) => {
      initialStatus[pasien.id] = 'Menunggu';
    });
    setStatus(initialStatus);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [id]: newStatus,
    }));
  };

  const toggleEdit = (id) => {
    setIsEditing(isEditing === id ? null : id);
  };

  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
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
          width: sidebarOpen ? '255px' : '80px',
          boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#FFFFF',
          overflowY: 'auto',
          transition: 'width 0.3s',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <h4 className="fw-bold mb-0" style={{ color: primaryColor }}>
              {sidebarOpen ? "Antrian Pasien" : ""}
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
                <FormControl type="text" placeholder="Cari..." className="border-0" />
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

        {/* Menu Sidebar with Icons */}
        <Nav.Link as={Link} to="/dashboard-pasien" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
                 <FaTachometerAlt className="me-2" /> {sidebarOpen ? 'Dashboard Pasien' : ''}
               </Nav.Link>
              <Nav.Link
          onClick={() => setShowModal(true)} 
          className="fw-semibold mb-3 pb-3 border-bottom"
          style={{ color: primaryColor }}
      >
          <FaUserPlus className="me-2" /> {sidebarOpen ? 'Penjadwalan Pasien' : ''}
      </Nav.Link>
              <Nav.Link
                as={Link}
                to="/pasien/jadwalpasien"
                className="fw-semibold mb-3 pb-3 border-bottom"
                style={{ color: primaryColor }}
              >
                <FaClock className="me-2" /> {sidebarOpen ? 'Antrian Pasien' : ''} 
              </Nav.Link>
            <Nav.Link
                      as={Link}
                      to="/pasien/riwayat-rekam-medis"
                      className="fw-semibold mb-3 pb-3 border-bottom"
                      style={{ color: primaryColor }}
                    >
                      <FaClipboardList className="me-2" /> {sidebarOpen ? 'Riwayat Rekam Medis' : ''} 
                    </Nav.Link>
              {/* Toggle Sidebar Button */}
              <div className="mt-auto"></div>
            </Nav>

      {/* Konten Utama */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: 'white', marginLeft: sidebarOpen ? '250px' : '80px', transition: 'margin-left 0.3s' }}>
        <Navbar bg="white" className="mb-4 px-3 shadow-sm d-flex justify-content-between align-items-center rounded-3" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          <FaBars className="d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)} />
          <Navbar.Brand className="fw-bold" style={{ color: primaryColor }}>Klik Bidan Desak</Navbar.Brand>
          <div className="d-flex align-items-center">
            <NavDropdown align="end" className="ms-4" title={<FaBell size={24} />} id="notifikasi-dropdown">
              <NavDropdown.Item href="#/action-1">Notifikasi 1: Pemberitahuan A</NavDropdown.Item>
              <NavDropdown.Item href="#/action-2">Notifikasi 2: Pemberitahuan B</NavDropdown.Item>
              <NavDropdown.Item href="#/action-3">Notifikasi 3: Pemberitahuan C</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<FaUserCircle size={25} />} id="profile-dropdown" align="end" menuVariant="light" className="dropdown-menu-end ms-3">
              <NavDropdown.Item as={Link} to="/bidan/profil">Ubah Profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar>

        {/* TABEL ANTRIAN */}
        <Row className="justify-content-center">
          <Col md={12}>
            <Card className="shadow-lg p-4 border-0 rounded-4" style={{ backgroundColor: '#ffffff' }}>
              <h4 className="mb-3 text-center">Daftar Antrian Pasien</h4>
              <Table striped bordered hover responsive>
                <thead>
                  <tr className="text-center">
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Layanan</th>
                    <th>Tanggal</th>
                    <th>Jam</th>
                    <th>Keluhan</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jadwalPasien.map((pasien) => (
                    <tr key={pasien.id}>
                      <td className='text-center'>{pasien.id}</td>
                      <td className='text-justify'>{pasien.nama}</td>
                      <td className='text-justify'>{pasien.layanan}</td>
                      <td className='text-justify'>{pasien.tanggal}</td>
                      <td className='text-justify'>{pasien.jam}</td>
                      <td className='text-justify'>{pasien.keluhan}</td>
                      <td className='text-justify'>
                        {isEditing === pasien.id ? (
                          <select
                            value={status[pasien.id] || 'Menunggu'}
                            onChange={(e) => handleStatusChange(pasien.id, e.target.value)}
                            className="form-select"
                            style={{ width: '150px' }}
                          >
                            <option value="Menunggu">Menunggu</option>
                            <option value="Sedang Periksa">Sedang Periksa</option>
                            <option value="Sudah Periksa">Sudah Periksa</option>
                            <option value="Batal Periksa">Batal Periksa</option>
                          </select>
                        ) : (
                          status[pasien.id] || 'Menunggu'
                        )}
                      </td>
                    
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
     <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Booking Jadwal Pasien</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PendaftaranolehBidan onClose={() => setShowModal(false)} />
          
      </Modal.Body>
    </Modal>
      </div>
      
    </div>
  );
};
export default JadwalPasien;