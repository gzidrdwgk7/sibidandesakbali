import React, { useState, useRef } from "react";
import { Nav, Form, InputGroup, Navbar, NavDropdown, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaBars, FaSearch, FaTachometerAlt, FaUserPlus, FaClock,
  FaStethoscope, FaBaby, FaBookMedical, FaSyringe, FaBell, FaUserCircle, FaPrint
} from "react-icons/fa";
import PendaftaranolehBidan from './PendaftaranolehBidan';

const primaryColor = "#e064ac";

const RekamMedis = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const printRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [selectedPasien, setSelectedPasien] = useState(null);
  const antrianPasien = JSON.parse(localStorage.getItem('antrianPasien')) || [];

  const handleChangePasien = (e) => {
    const selectedId = e.target.value;
    const dataPasien = antrianPasien.find(p => p.id === selectedId);
    setSelectedPasien(dataPasien);
  };

  const handlePrint = () => {
  if (!selectedPasien) {
    alert('Pilih nama pasien terlebih dahulu!');
    return;
  }

  const printContents = printRef.current.innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
};


  const logOut = () => {
    console.log("Logging out...");
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

        <Nav.Link as={Link} to="/dashboard-bidan" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaTachometerAlt className="me-2" /> {sidebarOpen ? 'Dashboard Bidan' : ''}
        </Nav.Link>
        <Nav.Link onClick={() => setShowModal(true)} className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaUserPlus className="me-2" /> {sidebarOpen ? "Pendaftaran Pasien" : ""}
        </Nav.Link>
        <Nav.Link as={Link} to="/bidan/antrianpasien" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaClock className="me-2" /> {sidebarOpen ? 'Antrian Pasien' : ''}
        </Nav.Link>
        <Nav.Link as={Link} to="/bidan/pemeriksaan" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaStethoscope className="me-2" /> {sidebarOpen ? 'Pemeriksaan' : ''}
        </Nav.Link>
        <Nav.Link as={Link} to="/bidan/persalinan" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaBaby className="me-2" /> {sidebarOpen ? 'Persalinan' : ''}
        </Nav.Link>
        <Nav.Link as={Link} to="/bidan/pasca-persalinan" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaBookMedical className="me-2" /> {sidebarOpen ? 'Pasca Persalinan' : ''}
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/bidan/laporan-rekam-medis"
          className="fw-semibold mb-3 pb-3 border-bottom rounded px-2"
          style={{
            backgroundColor: primaryColor,
            color: 'white'
          }}>
          <FaStethoscope className="me-2" /> {sidebarOpen ? 'Rekam Medis' : ''}
        </Nav.Link>
        <Nav.Link as={Link} to="/bidan/imunisasi-bayi" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaSyringe className="me-2" /> {sidebarOpen ? 'Imunisasi Bayi' : ''}
        </Nav.Link>
      </Nav>

      {/* Main Content */}
      <div className="flex-grow-1 p-4"
        style={{
          backgroundColor: 'white',
          marginLeft: sidebarOpen ? '250px' : '80px',
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

        <div className="d-flex justify-content-end mb-3 d-print-none">
          <Button variant="danger" onClick={handlePrint}><FaPrint className="me-2" /> Cetak Rekam Medis</Button>
        </div>

        <div className="shadow-lg p-4 border-0 rounded-4 bg-white">
          {/* Dropdown Pilih Pasien */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Pilih Nama Pasien</Form.Label>
            <Form.Select onChange={handleChangePasien} defaultValue="">
              <option value="" disabled>Pilih Pasien</option>
              {antrianPasien.map((p) => (
                <option key={p.id} value={p.id}>{p.nama} ({p.id})</option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Konten Rekam Medis */}
          {selectedPasien ? (
            <div ref={printRef}>
              <div className="p-4 border rounded-4 shadow-sm bg-white mb-4">
                <h5 className="fw-bold mb-3">Data Pasien</h5>
                <p><strong>Nama:</strong> {selectedPasien.nama}</p>
                <p><strong>Nomor WA:</strong> {selectedPasien.whatsapp}</p>
                <p><strong>Layanan:</strong> {selectedPasien.layanan}</p>
                <p><strong>Keluhan:</strong> {selectedPasien.keluhan}</p>
                <p><strong>Tanggal:</strong> {selectedPasien.tanggal}</p>
                <p><strong>Jam:</strong> {selectedPasien.jam}</p>
              </div>

             {/* Pemeriksaan */}
<div className="p-4 border rounded-4 shadow-sm bg-white mb-4">
  <h5 className="fw-bold mb-3">Pemeriksaan</h5>
  <p><strong>Tanggal:</strong> 2025-06-10</p>
  <p><strong>Keluhan:</strong> Mual dan pusing</p>
  <p><strong>Tekanan Darah:</strong> 110/70</p>
  <p><strong>Diagnosa:</strong> Kehamilan trimester 1 normal</p>
  <p><strong>Tindakan:</strong> Edukasi nutrisi, jadwal kontrol 2 minggu</p>
</div>

{/* Persalinan */}
<div className="p-4 border rounded-4 shadow-sm bg-white mb-4">
  <h5 className="fw-bold mb-3">Persalinan</h5>
  <p><strong>Tanggal:</strong> 2025-08-01</p>
  <p><strong>Jenis:</strong> Normal</p>
  <p><strong>Tempat:</strong> Praktek Bidan Desak</p>
  <p><strong>Kondisi Ibu:</strong> Stabil</p>
  <p><strong>Kondisi Bayi:</strong> Sehat</p>
  <p><strong>APGAR Score:</strong> 9</p>
</div>

{/* Pasca Persalinan / Nifas */}
<div className="p-4 border rounded-4 shadow-sm bg-white mb-4">
  <h5 className="fw-bold mb-3">Pasca Persalinan (Nifas)</h5>
  <p><strong>Tanggal:</strong> 2025-08-04</p>
  <p><strong>Tekanan Darah:</strong> 120/80</p>
  <p><strong>Lochia:</strong> Merah segar</p>
  <p><strong>Laktasi:</strong> Lancar</p>
  <p><strong>Edukasi:</strong> Menjaga kebersihan, KB pasca nifas</p>
</div>

{/* Imunisasi Bayi */}
<div className="p-4 border rounded-4 shadow-sm bg-white mb-4">
  <h5 className="fw-bold mb-3">Imunisasi Bayi</h5>
  <p><strong>Nama Bayi:</strong> Cristiano Ronaldo</p>
  <p><strong>Tanggal Lahir:</strong> 2025-08-01</p>
  <ul className="mb-0">
    <li>HB-0 – 2025-08-02</li>
    <li>BCG – 2025-08-15</li>
  </ul>
</div>

              <div className="text-muted">Ganti pilihan nama pasien untuk rekam medis pasien lainnya...</div>
            </div>
          ) : (
            <div className="text-muted fst-italic">Silakan pilih pasien terlebih dahulu untuk melihat rekam medis.</div>
          )}
        </div>
      </div>

      {/* Modal Pendaftaran */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Pendaftaran Pasien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PendaftaranolehBidan />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RekamMedis;
