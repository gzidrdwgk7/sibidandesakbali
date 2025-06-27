import React, { useState } from 'react';
import { Form, Button, Nav, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, NavDropdown, Modal } from 'react-bootstrap';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  FaBars, FaUserPlus, FaClipboardList, FaStethoscope, FaBaby,
  FaBookMedical, FaSyringe, FaClock, FaTachometerAlt, FaSearch
} from 'react-icons/fa';
import PendaftaranolehBidan from './PendaftaranolehBidan';

const Persalinan = () => {
  const [step, setStep] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const primaryColor = '#e064ac';
  const logOut = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userType');
  window.location.href = '/'; // atau gunakan navigate('/')
};
const [daftarPasien, setDaftarPasien] = useState([]);
const [namaPasien, setNamaPasien] = useState("");

useEffect(() => {
  const data = JSON.parse(localStorage.getItem("antrianPasien")) || [];
  setDaftarPasien(data);
}, []);

  const [showModal, setShowModal] = useState(false); 

  const [formData, setFormData] = useState({
    namaIbu: '',
    umur: '',
    alamat: '',
    hpht: '',
    tp: '',
    golDarah: '',
    keluhan: '',
    gerakanJanin: '',
    jenisPersalinan: '',
    presentasi: '',
    his: '',
    djj: '',
    penolong: '',
    kondisiIbu: '',
    kondisiBayi: '',
    keterangan: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const nextStep = () => {
  const currentStepForm = document.querySelectorAll(`[data-step="${step}"] input, [data-step="${step}"] textarea, [data-step="${step}"] select`);
  
  const isSemuaKosong = Array.from(currentStepForm).every(field => !field.value || field.value.trim() === '');

  if (isSemuaKosong) {
    alert('Harap isi data terlebih dahulu sebelum lanjut.');
    return;
  }

  setStep(prev => prev + 1);
};
const prevStep = () => setStep((prev) => prev - 1);
 const handleSubmit = (event) => {
  event.preventDefault(); 

  const currentStepForm = document.querySelectorAll(
    `[data-step="${step}"] input, [data-step="${step}"] textarea, [data-step="${step}"] select`
  );

  const isFormValid = Array.from(currentStepForm).every((el) => el.value && el.value.trim() !== '');

  if (!isFormValid) {
    alert('Harap lengkapi semua data sebelum menyimpan.');
    return;
  }

  alert('Data berhasil disimpan!');
  navigate('/bidan/laporan-rekam-medis'); 
};

const [currentDateTime, setCurrentDateTime] = useState({
  day: '',
  date: '',
  time: ''
});
const navigate = useNavigate();

const formatDateTime = () => {
  const now = new Date();
  const dayOptions = { weekday: 'long' };
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

  const day = now.toLocaleDateString('id-ID', dayOptions);
  const date = now.toLocaleDateString('id-ID', dateOptions);
  const time = now.toLocaleTimeString('id-ID', timeOptions);

  setCurrentDateTime({ day, date, time });
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
        <Nav.Link onClick={() => setShowModal(true)} className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaUserPlus className="me-2" /> {sidebarOpen ? "Pendaftaran Pasien" : ""}
        </Nav.Link>
        <Nav.Link as={Link} to="/bidan/antrianpasien" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaClock className="me-2" /> {sidebarOpen ? 'Antrian Pasien' : ''}
        </Nav.Link>
        <Nav.Link as={Link} to="/bidan/pemeriksaan" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaStethoscope className="me-2" /> {sidebarOpen ? 'Pemeriksaan' : ''}
        </Nav.Link>
          <Nav.Link
                  as={Link}
                  to="/bidan/persalinan"
                  className="fw-semibold mb-3 pb-3 border-bottom rounded px-2"
                  style={{
                    backgroundColor: primaryColor, // warna kotak
                    color: 'white'                 // warna teks
                  }}
                >
                  <FaStethoscope className="me-2" /> {sidebarOpen ? 'Persalinan' : ''}
                      </Nav.Link>
        <Nav.Link as={Link} to="/bidan/pasca-persalinan" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaBookMedical className="me-2" /> {sidebarOpen ? 'Pasca Persalinan' : ''}
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
     
            {/* Step Form */}
<div className="shadow-lg p-4 border-0 rounded-4 bg-white">
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
  <Col>
    <Form.Label>Hari</Form.Label>
    <Form.Control type="text" value={currentDateTime.day} disabled />
  </Col>
  <Col>
    <Form.Label>Tanggal</Form.Label>
    <Form.Control type="text" value={currentDateTime.date} disabled />
  </Col>
  <Col>
    <Form.Label>Jam</Form.Label>
    <Form.Control type="text" value={currentDateTime.time} disabled />
  </Col>
</Row>
          {step === 1 && (
            <>
             <div data-step="1">
              <h4 className="mb-4">I. DATA IDENTITAS IBU</h4>
              <Form.Group className="mb-3">
  <Form.Label>Nama Pasien</Form.Label>
  <Form.Select
    value={namaPasien}
    onChange={(e) => setNamaPasien(e.target.value)}
    required
  >
    <option value="">Pilih Nama Pasien</option>
    {daftarPasien.map((pasien) => (
      <option key={pasien.id} value={pasien.nama}>
        {pasien.nama} - {pasien.id}
      </option>
    ))}
  </Form.Select>
</Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Umur</Form.Label>
                <Form.Control type="number" name="umur" value={formData.umur} onChange={handleChange} required placeholder='Tulis umur pasien'/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Alamat</Form.Label>
                <Form.Control name="alamat" value={formData.alamat} onChange={handleChange} required placeholder='Tulis alamat rumah pasien'/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>HPHT</Form.Label>
                <Form.Control type="date" name="hpht" value={formData.hpht} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>TP</Form.Label>
                <Form.Control type="date" name="tp" value={formData.tp} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Golongan Darah</Form.Label>
                <Form.Control name="golDarah" value={formData.golDarah} onChange={handleChange} required placeholder='Tulis golongan darah pasien'/>
              </Form.Group>
              </div>
            </>
          )}

          {step === 2 && (
            <>
            <div data-step="2">
              <h4 className="mb-3">II. PEMERIKSAAN</h4>
              <Form.Group className="mb-3">
                <Form.Label>Keluhan Utama</Form.Label>
                <Form.Control as="textarea" name="keluhan" value={formData.keluhan} onChange={handleChange} required placeholder='Tulis keluhan utama pasien' />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gerakan Janin</Form.Label>
                <Form.Select name="gerakanJanin" value={formData.gerakanJanin} onChange={handleChange} required >
                  <option value="">Pilih...</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Menurun">Menurun</option>
                  <option value="Tidak Ada">Tidak Ada</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Jenis Persalinan</Form.Label>
                <Form.Select name="jenisPersalinan" value={formData.jenisPersalinan} onChange={handleChange} required>
                  <option value="">Pilih...</option>
                  <option value="Spontan">Spontan</option>
                  <option value="Sectio Caesarea">Sectio Caesarea</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Presentasi Janin</Form.Label>
                <Form.Control name="presentasi" value={formData.presentasi} onChange={handleChange} required placeholder='Tulis presentasi janin pasien'/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Frekuensi HIS</Form.Label>
                <Form.Control name="his" value={formData.his} onChange={handleChange} required placeholder='Tulis frekuensi HIS pasien'/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Denyut Jantung Janin (DJJ)</Form.Label>
                <Form.Control name="djj" value={formData.djj} onChange={handleChange} required placeholder='Tulis denyut jantung janin'/>
              </Form.Group>
              </div>
            </>
          )}
{step === 3 && (
  <>
  <div data-step="3">
    <h4 className="mb-3">III. PENATALAKSANAAN</h4>

    <Form.Group className="mb-3">
      <Form.Label>Kondisi Ibu</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        name="kondisiIbu"
        value={formData.kondisiIbu}
        onChange={handleChange}
        required
        placeholder="Tulis kondisi tertentu pada pasien, contoh: Ibu dalam keadaan sadar, tekanan darah normal, tidak ditemukan komplikasi."
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Kondisi Bayi</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        name="kondisiBayi"
        value={formData.kondisiBayi}
        onChange={handleChange}
        required
        placeholder="Tulis kondisi tertentu pada bayi pasien, contoh: Bayi lahir spontan, menangis kuat, tonus otot baik, kulit kemerahan."
      />
    </Form.Group>
    </div>
  </>
)}

          {/* Tombol Navigasi */}
          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={prevStep} disabled={step === 1}>
              Sebelumnya
            </Button>
            {step < 3 ? (
              <Button variant="primary" onClick={nextStep}>
                Selanjutnya
              </Button>
            ) : (
              <Button variant="success" type="submit">
                Simpan
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
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
export default Persalinan;