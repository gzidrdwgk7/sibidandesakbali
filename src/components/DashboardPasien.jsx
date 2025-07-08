import React, { useState } from 'react';
import {
  Row, Col, Card, Form, InputGroup, FormControl, Nav, Navbar, Dropdown, Modal, NavDropdown, Button
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  FaBars, FaBell, FaUserCircle, FaSearch, FaUserPlus, FaClock, FaClipboardList, FaTachometerAlt
} from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PendaftaranolehBidan from './Bidan/PendaftaranolehBidan';

const KalenderJanjiPasien = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const jadwal = {
    '2025-07-02': 'Pemeriksaan Kehamilan',
    '2025-07-09': 'Imunisasi Bayi',
    '2025-07-16': 'Konsultasi Laktasi'
  };

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const key = date.toISOString().split('T')[0];
      if (jadwal[key]) {
        return (
          <div style={{ marginTop: 5 }}>
            <span className="badge bg-success text-white" style={{ fontSize: '10px' }}>
              {jadwal[key]}
            </span>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="p-2">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={renderTileContent}
      />
    </div>
  );
};

const DashboardPasien = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const dataStunting = [
    { tahun: '2018', persentase: 30.8 },
    { tahun: '2019', persentase: 27.7 },
    { tahun: '2020', persentase: 27.6 },
    { tahun: '2021', persentase: 24.4 },
    { tahun: '2022', persentase: 21.6 },
    { tahun: '2023', persentase: 20.0 }
  ];

  const primaryColor = "black";
  const chartColor = '#FF2D8B';

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
          backgroundColor: '#FFFFFF',
          overflowY: 'auto',
          transition: 'width 0.3s',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            {sidebarOpen && <FaTachometerAlt size={28} style={{ color: primaryColor }} className="me-2" />}
            <h4 className="fw-bold mb-0" style={{ color: primaryColor }}>{sidebarOpen ? 'Dashboard' : ''}</h4>
          </div>
          <button className="btn btn-link" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ color: primaryColor }}>
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
          onClick={() => setShowModal(true)}
          className="fw-semibold mb-3 pb-3 border-bottom"
          style={{ color: primaryColor }}
        >
          <FaUserPlus className="me-2" /> {sidebarOpen ? 'Penjadwalan Pasien' : ''}
        </Nav.Link>

        <Nav.Link as={Link} to="/pasien/jadwalpasien" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaClock className="me-2" /> {sidebarOpen ? 'Antrian Pasien' : ''}
        </Nav.Link>

        <Nav.Link as={Link} to="/pasien/riwayat-rekam-medis" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaClipboardList className="me-2" /> {sidebarOpen ? 'Riwayat Rekam Medis' : ''}
        </Nav.Link>
      </Nav>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-4"
        style={{
          backgroundColor: 'white',
          marginLeft: sidebarOpen ? '255px' : '80px',
          height: '100vh',
          overflowY: 'scroll',
          transition: 'margin-left 0.3s',
        }}
      >
        <Navbar bg="white" className="mb-4 px-3 shadow-sm d-flex justify-content-between align-items-center rounded-3" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          <FaBars className="d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)} />
          <Navbar.Brand className="fw-bold" style={{ color: primaryColor }}>Klik Bidan Desak</Navbar.Brand>
          <div className="d-flex align-items-center">
            <NavDropdown align="end" className="ms-4" title={<FaBell size={24} />} id="notifikasi-dropdown">
              <NavDropdown.Item>Pemberitahuan A</NavDropdown.Item>
              <NavDropdown.Item>Pemberitahuan B</NavDropdown.Item>
              <NavDropdown.Item>Pemberitahuan C</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<FaUserCircle size={25} />} id="profile-dropdown" align="end" className="ms-3">
              <NavDropdown.Item as={Link} to="/pasien/profil">Ubah Profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar>

        <Row>
          <Col md={12} className="mb-4">
            <Card className="shadow p-4 border-0 bg-white rounded-4">
              <h4 className="fw-bold" style={{ color: primaryColor }}>Selamat Datang di Klik Bidan Desak</h4>
              <p className="mb-0">Pantau kehamilan, persalinan, dan tumbuh kembang bayi Anda bersama kami.</p>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card className="shadow p-4 border-0 bg-white rounded-4 h-100">
              <h5 className="fw-bold" style={{ color: primaryColor }}>Status Pemeriksaan</h5>
              <p>Belum ada pemeriksaan bulan ini. Jadwalkan segera!</p>
              <Button className="btn btn-primary rounded-3 mt-2" onClick={() => setShowModal(true)}>
                Jadwalkan
              </Button>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card className="shadow p-4 border-0 bg-white rounded-4 h-100">
              <h5 className="fw-bold" style={{ color: primaryColor }}>Imunisasi Bayi</h5>
              <p>2 dari 5 imunisasi dasar telah dilakukan.</p>
              <Link to="/pasien/jadwalpasien" className="btn btn-warning rounded-3 mt-2">Lihat Jadwal</Link>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card className="shadow p-4 border-0 bg-white rounded-4 h-100">
              <h5 className="fw-bold" style={{ color: primaryColor }}>Edukasi Anti Stunting</h5>
              <div style={{ width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden' }}>
                <iframe
                  width="100%" height="100%"
                  src="https://www.youtube.com/embed/zqpinGFvivg?si=w32eSXQ9YcrzqdIWc"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card className="shadow p-4 border-0 bg-white rounded-4">
              <h5 className="fw-bold" style={{ color: primaryColor }}>Data Stunting di Indonesia</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataStunting}>
                  <XAxis dataKey="tahun" />
                  <YAxis domain={[0, 35]} tickFormatter={(tick) => `${tick}%`} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="persentase" stroke={chartColor} strokeWidth={3} name="Stunting (%)" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>

                 {/* Kalender Janji Temu */}
       <Col md={12} className="mb-4">
  <Card className="shadow p-4 border-0 bg-white rounded-4">
    <h5 className="fw-bold mb-4" style={{ color: primaryColor }}>Kalender Janji Temu</h5>
    <div style={{ width: '100%' }}>
      <div style={{ width: '100%', maxWidth: '100%' }}>
        <Calendar
          className="w-100 kalender-custom"
          tileContent={({ date, view }) => {
            const dateString = date.toISOString().split('T')[0];
            if (view === 'month') {
              if (dateString === '2025-07-02') return <p className="text-success">🩺Jadwal Periksa</p>;
            }
          }}
        />
      </div>
    </div>
  </Card>
</Col>

        </Row>
      </div>

      {/* Modal Booking */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Booking Jadwal Pasien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PendaftaranolehBidan onClose={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashboardPasien;
