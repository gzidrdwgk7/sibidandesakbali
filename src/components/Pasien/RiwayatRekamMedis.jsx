import React, { useState, useRef } from "react";
import {
  Button, Form, Card, Container, Nav, Navbar, NavDropdown,
  InputGroup
} from "react-bootstrap";
import {
  FaPrint, FaBars, FaSearch, FaTachometerAlt, FaUserPlus,
  FaClock, FaClipboardList, FaBell, FaUserCircle
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import PendaftaranolehBidan from '../Bidan/PendaftaranolehBidan';



const primaryColor = "#e064ac";

const RiwayatRekamMedis = () => {
  const [selectedPasien, setSelectedPasien] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const printRef = useRef();


  const daftarPasien = JSON.parse(localStorage.getItem('jadwalPasien')) || [];
const [showModal, setShowModal] = useState(false);
  const handleChangePasien = (e) => {
    const id = e.target.value;
    const pasien = daftarPasien.find(p => p.id === id);
    setSelectedPasien(pasien);
  };

  const handlePrint = () => {
    if (!selectedPasien) {
      alert("Pilih pasien terlebih dahulu.");
      return;
    }
    const content = printRef.current.innerHTML;
    const original = document.body.innerHTML;
    document.body.innerHTML = content;
    window.print();
    document.body.innerHTML = original;
    window.location.reload();
  };

  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    window.location.href = '/';
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Nav className="flex-column p-3"
        style={{
          position: 'fixed', top: 0, bottom: 0,
          width: sidebarOpen ? '255px' : '80px',
          boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#FFFFFF', overflowY: 'auto', transition: 'width 0.3s',
        }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0" style={{ color: primaryColor }}>
            {sidebarOpen ? "Pemeriksaan" : ""}
          </h4>
          <button className="btn btn-link"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ color: primaryColor, fontSize: "20px" }}>
            <FaBars />
          </button>
        </div>

        <Form className="mb-3">
          <InputGroup className="rounded-pill border">
            {sidebarOpen ? (
              <>
                <Form.Control type="text" placeholder="Cari..." className="border-0" />
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

        {/* Sidebar Menu */}
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
          style={{ backgroundColor: primaryColor, color: 'white' }}
        >
          <FaClipboardList className="me-2" /> {sidebarOpen ? 'Riwayat Rekam Medis' : ''}
        </Nav.Link>
      </Nav>

      {/* Main Content */}
      <div className="flex-grow-1 p-4"
        style={{
          backgroundColor: 'white',
          marginLeft: sidebarOpen ? '255px' : '80px',
          transition: 'margin-left 0.3s'
        }}>
        <Navbar bg="white" className="mb-4 px-3 shadow-sm d-flex justify-content-between align-items-center rounded-3"
          style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          <FaBars className="d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)} />
          <Navbar.Brand className="fw-bold" style={{ color: primaryColor }}>Klik Bidan Desak</Navbar.Brand>
          <div className="d-flex align-items-center">
            <NavDropdown align="end" className="ms-4" title={<FaBell size={24} />} id="notifikasi-dropdown">
              <NavDropdown.Item href="#/action-1">Notifikasi A</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<FaUserCircle size={25} />} id="profile-dropdown" align="end" className="ms-3">
              <NavDropdown.Item as={Link} to="/bidan/profil">Ubah Profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar>

        <Container>
          {/* Dropdown Pilih Tanggal Pasien */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Pilih Berdasarkan Tanggal</Form.Label>
            <Form.Select onChange={handleChangePasien} defaultValue="">
              <option value="" disabled>Pilih Tanggal Pemeriksaan</option>
              {[...daftarPasien]
                .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.tanggal} – {p.layanan}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end mb-3 d-print-none">
            <Button variant="danger" onClick={handlePrint}>
              <FaPrint className="me-2" /> Cetak Rekam Medis
            </Button>
          </div>

          {selectedPasien ? (
            <div ref={printRef}>
              <Card className="p-4 mb-4">
                <h5 className="fw-bold mb-3">Data Pasien</h5>
                <p><strong>Nama:</strong> {selectedPasien.nama}</p>
                <p><strong>Nomor WA:</strong> {selectedPasien.whatsapp}</p>
                <p><strong>Layanan:</strong> {selectedPasien.layanan}</p>
                <p><strong>Keluhan:</strong> {selectedPasien.keluhan}</p>
                <p><strong>Tanggal:</strong> {selectedPasien.tanggal}</p>
                <p><strong>Jam:</strong> {selectedPasien.jam}</p>
              </Card>

              <Card className="p-4 mb-4">
                <h5 className="fw-bold mb-3">Pemeriksaan</h5>
                <p><strong>Tanggal:</strong> 2025-06-10</p>
                <p><strong>Diagnosa:</strong> Kehamilan normal</p>
                <p><strong>Tekanan Darah:</strong> 110/70</p>
                <p><strong>Tindakan:</strong> Edukasi dan kontrol ulang 2 minggu</p>
              </Card>

              <Card className="p-4 mb-4">
                <h5 className="fw-bold mb-3">Persalinan</h5>
                <p><strong>Tanggal:</strong> 2025-08-01</p>
                <p><strong>Jenis:</strong> Normal</p>
                <p><strong>Tempat:</strong> Klinik Bidan Desak</p>
                <p><strong>Kondisi Ibu:</strong> Stabil</p>
                <p><strong>Kondisi Bayi:</strong> Sehat</p>
              </Card>

              <Card className="p-4 mb-4">
                <h5 className="fw-bold mb-3">Pasca Persalinan</h5>
                <p><strong>Tanggal:</strong> 2025-08-04</p>
                <p><strong>Lochia:</strong> Merah segar</p>
                <p><strong>Laktasi:</strong> Lancar</p>
                <p><strong>Edukasi:</strong> KB dan kebersihan diri</p>
              </Card>

              <Card className="p-4 mb-4">
                <h5 className="fw-bold mb-3">Imunisasi Bayi</h5>
                <ul>
                  <li>HB-0 – 2025-08-02</li>
                  <li>BCG – 2025-08-15</li>
                </ul>
              </Card>
            </div>
          ) : (
            <p className="text-muted fst-italic">Silakan pilih tanggal pasien terlebih dahulu.</p>
          )}
        </Container>
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

export default RiwayatRekamMedis;
