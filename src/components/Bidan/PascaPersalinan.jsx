import React, { useState, useEffect } from 'react';
import { Form, Button, Nav, InputGroup, Row, Col, Navbar, NavDropdown, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaBars, FaUserPlus, FaClipboardList, FaStethoscope, FaBaby,
  FaBookMedical, FaSyringe, FaClock, FaTachometerAlt, FaSearch,
  FaBell, FaUserCircle
} from 'react-icons/fa';

const PascaPersalinan = () => {
  const [step, setStep] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const primaryColor = '#e064ac';

  const [formData, setFormData] = useState({
    namaIbu: '', namaSuami: '', umurIbu: '', umurSuami: '',
    pendidikanIbu: '', pekerjaanIbu: '', alamat: '',
    keluhan: '', metodePersalinan: '', penolong: '',
    nifasIbu: '', nifasBayi: '', laktasi: '',
    perasaan: '', penerimaan: '', hubunganKeluarga: '', budaya: '',
    td: '', nadi: '', suhu: '', rencanaKB: ''
  });

  const [currentDateTime, setCurrentDateTime] = useState({ day: '', date: '', time: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    window.location.href = '/';
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (step === 3) {
    alert('Data berhasil disimpan!\n\n' + JSON.stringify(formData, null, 2));
  }
};

  const formatDateTime = () => {
    const now = new Date();
    const dayOptions = { weekday: 'long' };
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    setCurrentDateTime({
      day: now.toLocaleDateString('id-ID', dayOptions),
      date: now.toLocaleDateString('id-ID', dateOptions),
      time: now.toLocaleTimeString('id-ID', timeOptions),
    });
  };

  useEffect(() => {
    formatDateTime();
    const interval = setInterval(formatDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div className="d-flex">
        {/* Sidebar */}
        <Nav className="flex-column p-3"
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            width: sidebarOpen ? '255px' : '80px',
            boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#FFFFFF',
            overflowY: 'auto',
            transition: 'width 0.3s',
          }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0" style={{ color: primaryColor }}>
              {sidebarOpen ? "Persalinan" : ""}
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
          <Nav.Link as={Link} to="/bidan/pendaftaran" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
            <FaUserPlus className="me-2" /> {sidebarOpen ? 'Pendaftaran Pasien' : ''}
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
        <Nav.Link
          as={Link}
          to="/bidan/pasca-persalinan"
          className="fw-semibold mb-3 pb-3 border-bottom rounded px-2"
          style={{
            backgroundColor: primaryColor, // warna kotak
            color: 'white'                 // warna teks
          }}
        >
          <FaStethoscope className="me-2" /> {sidebarOpen ? 'Pasca Persalinan' : ''}
              </Nav.Link>
          <Nav.Link as={Link} to="/bidan/laporan-rekam-medis" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
            <FaClipboardList className="me-2" /> {sidebarOpen ? 'Rekam Medis' : ''}
          </Nav.Link>
          <Nav.Link as={Link} to="/bidan/imunisasi-bayi" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
            <FaSyringe className="me-2" /> {sidebarOpen ? 'Imunisasi Bayi' : ''}
          </Nav.Link>
        </Nav>
{/* Konten Utama */}
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
     
<div className="shadow-lg p-4 border-0 rounded-4 bg-white">
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
            <Col><Form.Label>Hari</Form.Label><Form.Control type="text" value={currentDateTime.day} disabled /></Col>
            <Col><Form.Label>Tanggal</Form.Label><Form.Control type="text" value={currentDateTime.date} disabled /></Col>
            <Col><Form.Label>Jam</Form.Label><Form.Control type="text" value={currentDateTime.time} disabled /></Col>
          </Row>

          {step === 1 && (
            <>
              <h3 className="mb-3">I. IDENTITAS DAN KELUHAN</h3>
              <Form.Group className="mb-3">
                <Form.Label>Nama Ibu</Form.Label>
                <Form.Control name="namaIbu" value={formData.namaIbu} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nama Suami</Form.Label>
                <Form.Control name="namaSuami" value={formData.namaSuami} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Umur Ibu</Form.Label>
                <Form.Control name="umurIbu" value={formData.umurIbu} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Alamat</Form.Label>
                <Form.Control name="alamat" value={formData.alamat} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Keluhan Utama</Form.Label>
                <Form.Control as="textarea" name="keluhan" value={formData.keluhan} onChange={handleChange} />
              </Form.Group>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="mb-3">II. PEMERIKSAAN NIFAS</h3>
              <Form.Group className="mb-3">
                <Form.Label>Metode Persalinan</Form.Label>
                <Form.Control name="metodePersalinan" value={formData.metodePersalinan} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Penolong Persalinan</Form.Label>
                <Form.Control name="penolong" value={formData.penolong} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kondisi Ibu Saat Ini</Form.Label>
                <Form.Control as="textarea" name="nifasIbu" value={formData.nifasIbu} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kondisi Bayi Saat Ini</Form.Label>
                <Form.Control as="textarea" name="nifasBayi" value={formData.nifasBayi} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Riwayat Laktasi</Form.Label>
                <Form.Control as="textarea" name="laktasi" value={formData.laktasi} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Perencanaan KB</Form.Label>
                <Form.Control name="rencanaKB" value={formData.rencanaKB} onChange={handleChange} />
              </Form.Group>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="mb-3">III. PSIKOLOSISAL DAN TTV</h3>
              <Form.Group className="mb-3">
                <Form.Label>Perasaan Ibu</Form.Label>
                <Form.Control as="textarea" name="perasaan" value={formData.perasaan} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Penerimaan terhadap kelahiran</Form.Label>
                <Form.Control as="textarea" name="penerimaan" value={formData.penerimaan} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hubungan Suami & Keluarga</Form.Label>
                <Form.Control as="textarea" name="hubunganKeluarga" value={formData.hubunganKeluarga} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Budaya/Adat Istiadat</Form.Label>
                <Form.Control as="textarea" name="budaya" value={formData.budaya} onChange={handleChange} />
              </Form.Group>
              <Row className="mb-3">
                <Col><Form.Label>TD</Form.Label><Form.Control name="td" value={formData.td} onChange={handleChange} /></Col>
                <Col><Form.Label>Nadi</Form.Label><Form.Control name="nadi" value={formData.nadi} onChange={handleChange} /></Col>
                <Col><Form.Label>Suhu</Form.Label><Form.Control name="suhu" value={formData.suhu} onChange={handleChange} /></Col>
              </Row>
            </>
          )}

          <div className="d-flex justify-content-between mt-4">
                    <Button variant="secondary" onClick={prevStep} disabled={step === 1}>
                      Sebelumnya
                    </Button>
                    {step < 4 ? (
                      <Button variant="primary" onClick={nextStep}>
                        Selanjutnya
                      </Button>
                    ) : (
    <Button variant="success" onClick={handleSubmit}>
      Simpan
    </Button>
                    )}
                  </div>

        </Form>
      </div>
    </div>
    </div>
  );
};

export default PascaPersalinan;