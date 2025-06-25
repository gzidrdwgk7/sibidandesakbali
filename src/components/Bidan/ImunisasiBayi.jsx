import React, { useState, useEffect } from 'react';
import { Form, Button, Nav, InputGroup, Row, Col, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaBars, FaUserPlus, FaClipboardList, FaStethoscope, FaBaby,
  FaBookMedical, FaSyringe, FaClock, FaTachometerAlt, FaSearch,
  FaBell, FaUserCircle
} from 'react-icons/fa';

const ImunisasiBayi = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [step, setStep] = useState(1);
  const primaryColor = '#e064ac';
  const [formData, setFormData] = useState({});

  const [currentDateTime, setCurrentDateTime] = useState({ day: '', date: '', time: '' });
  useEffect(() => {
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
    formatDateTime();
    const interval = setInterval(formatDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    window.location.href = '/';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    alert('Data berhasil disimpan!\n\n' + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="d-flex">
      <Nav className="flex-column p-3" style={{ position: 'fixed', top: 0, bottom: 0, width: sidebarOpen ? '255px' : '80px', backgroundColor: '#fff', boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.2)', overflowY: 'auto', transition: 'width 0.3s' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0" style={{ color: primaryColor }}>{sidebarOpen ? 'Imunisasi Bayi' : ''}</h4>
          <button className="btn btn-link" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ color: primaryColor }}><FaBars /></button>
        </div>
        <Form className="mb-3">
          <InputGroup className="rounded-pill border">
            {sidebarOpen ? (
              <>
                <Form.Control type="text" placeholder="Cari..." className="border-0" />
                <InputGroup.Text className="bg-transparent border-0" style={{ color: primaryColor }}><FaSearch /></InputGroup.Text>
              </>
            ) : (
              <InputGroup.Text className="bg-transparent border-0" style={{ color: primaryColor }}><FaSearch /></InputGroup.Text>
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
            <Col><Form.Label>Hari</Form.Label><Form.Control type="text" value={currentDateTime.day} disabled /></Col>
            <Col><Form.Label>Tanggal</Form.Label><Form.Control type="text" value={currentDateTime.date} disabled /></Col>
            <Col><Form.Label>Jam</Form.Label><Form.Control type="text" value={currentDateTime.time} disabled /></Col>
          </Row>

          {step === 1 && (
            <>
              <h5 className="mb-3">I. IDENTITAS ANAK DAN ORANG TUA</h5>
              <Form.Group className="mb-3">
                <Form.Label>Nama Anak</Form.Label>
                <Form.Control name="namaAnak" value={formData.namaAnak || ''} onChange={handleChange} required />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Tanggal Lahir</Form.Label>
                    <Form.Control type="date" name="tglLahir" value={formData.tglLahir || ''} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Jam Lahir</Form.Label>
                    <Form.Control type="time" name="jamLahir" value={formData.jamLahir || ''} onChange={handleChange} required />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select name="jenisKelamin" value={formData.jenisKelamin || ''} onChange={handleChange} required>
                  <option value="">Pilih...</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Umur Anak (bulan)</Form.Label>
                <Form.Control type="number" name="umurAnak" value={formData.umurAnak || ''} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Alamat Rumah</Form.Label>
                <Form.Control name="alamat" value={formData.alamat || ''} onChange={handleChange} required />
              </Form.Group>
            </>
          )}
            {step === 2 && (
            <>
              <h5 className="mb-3">II. CATATAN RIWAYAT</h5>
              <Form.Group className="mb-3">
                <Form.Label>Riwayat Prenatal (GPA, Gestasi, ANC)</Form.Label>
                <Form.Control as="textarea" rows={2} name="riwayatPrenatal" value={formData.riwayatPrenatal || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Riwayat Intranatal</Form.Label>
                <Form.Control as="textarea" rows={2} name="riwayatIntranatal" value={formData.riwayatIntranatal || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Riwayat Postnatal</Form.Label>
                <Form.Control as="textarea" rows={2} name="riwayatPostnatal" value={formData.riwayatPostnatal || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Riwayat Imunisasi</Form.Label>
                <Form.Control as="textarea" rows={2} name="riwayatImunisasi" value={formData.riwayatImunisasi || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Perkembangan Bayi</Form.Label>
                <Form.Control as="textarea" rows={2} name="perkembanganBayi" value={formData.perkembanganBayi || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data Bio, Psiko, Sosial, Spiritual</Form.Label>
                <Form.Control as="textarea" rows={2} name="bioPsikoSosialSpiritual" value={formData.bioPsikoSosialSpiritual || ''} onChange={handleChange} />
              </Form.Group>
            </>
          )}
{step === 3 && (
            <>
              <h5 className="mb-3">III. KONDISI BAYI</h5>

              <Form.Group className="mb-3">
                <Form.Label>Keadaan Saat Ini (gerak, tangis, warna kulit)</Form.Label>
                <Form.Control as="textarea" rows={2} name="keadaanSaatIni" value={formData.keadaanSaatIni || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pemeriksaan Umum (BB, PB, LK, LD, HR, Suhu, RR)</Form.Label>
                <Form.Control as="textarea" rows={2} name="pemeriksaanUmum" value={formData.pemeriksaanUmum || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pemeriksaan Fisik (kepala, mata, mulut, telinga, dada, perut, genetalia, ekstremitas)</Form.Label>
                <Form.Control as="textarea" rows={2} name="pemeriksaanFisik" value={formData.pemeriksaanFisik || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Refleks (grasping, babinski, dll)</Form.Label>
                <Form.Control as="textarea" rows={2} name="refleks" value={formData.refleks || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pemeriksaan Penunjang (jika ada)</Form.Label>
                <Form.Control as="textarea" rows={2} name="pemeriksaanPenunjang" value={formData.pemeriksaanPenunjang || ''} onChange={handleChange} />
              </Form.Group>
            </>
          )}
     {step === 3 && (
            <>
              <h5 className="mb-3">🟦 Data Obyektif</h5>

              <Form.Group className="mb-3">
                <Form.Label>Keadaan Saat Ini (gerak, tangis, warna kulit)</Form.Label>
                <Form.Control as="textarea" rows={2} name="keadaanSaatIni" value={formData.keadaanSaatIni || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pemeriksaan Umum (BB, PB, LK, LD, HR, Suhu, RR)</Form.Label>
                <Form.Control as="textarea" rows={2} name="pemeriksaanUmum" value={formData.pemeriksaanUmum || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pemeriksaan Fisik (kepala, mata, mulut, telinga, dada, perut, genetalia, ekstremitas)</Form.Label>
                <Form.Control as="textarea" rows={2} name="pemeriksaanFisik" value={formData.pemeriksaanFisik || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Refleks (grasping, babinski, dll)</Form.Label>
                <Form.Control as="textarea" rows={2} name="refleks" value={formData.refleks || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pemeriksaan Penunjang (jika ada)</Form.Label>
                <Form.Control as="textarea" rows={2} name="pemeriksaanPenunjang" value={formData.pemeriksaanPenunjang || ''} onChange={handleChange} />
              </Form.Group>
            </>
          )}

{step === 4 && (
  <>
    <h5 className="mb-3">🟥 Diagnosa dan Masalah</h5>

    <Form.Group className="mb-3">
      <Form.Label>Diagnosa</Form.Label>
      <Form.Control as="textarea" rows={2} name="diagnosa" value={formData.diagnosa || ''} onChange={handleChange} />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Masalah</Form.Label>
      <Form.Control as="textarea" rows={2} name="masalah" value={formData.masalah || ''} onChange={handleChange} />
    </Form.Group>
  </>
)}

          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={prevStep} disabled={step === 1}>Sebelumnya</Button>
            {step < 4 ? (
              <Button variant="primary" type="button" onClick={nextStep}>Selanjutnya</Button>
            ) : (
              <Button variant="success" type="button" onClick={handleSubmit}>Simpan</Button>
            )}
          </div>
        </Form>
      </div>
      </div>
    </div>
  );
};

export default ImunisasiBayi;