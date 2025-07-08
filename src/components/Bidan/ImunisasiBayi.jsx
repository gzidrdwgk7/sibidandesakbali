import React, { useState, useEffect } from 'react';
import { Form, Button, Nav, InputGroup, Row, Col, Navbar, NavDropdown, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBars, FaUserPlus, FaClipboardList, FaStethoscope, FaBaby,
  FaBookMedical, FaSyringe, FaClock, FaTachometerAlt, FaSearch,
  FaBell, FaUserCircle
} from 'react-icons/fa';
import PendaftaranolehBidan from './PendaftaranolehBidan';  

const ImunisasiBayi = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [step, setStep] = useState(1);
  const primaryColor = "black";
  const [showModal, setShowModal] = useState(false); 
  const [formData, setFormData] = useState({});
const [daftarPasien, setDaftarPasien] = useState([]);
const [namaPasien, setNamaPasien] = useState("");
useEffect(() => {
  const data = JSON.parse(localStorage.getItem("antrianPasien")) || [];
  setDaftarPasien(data);
}, []);
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
const navigate = useNavigate();
  const handleSubmit = () => {
  const currentStepForm = document.querySelectorAll(
    `[data-step="${step}"] input, [data-step="${step}"] textarea, [data-step="${step}"] select`
  );

  const isFormValid = Array.from(currentStepForm).every((el) => el.value && el.value.trim() !== '');

  if (!isFormValid) {
    alert('Harap lengkapi semua data sebelum menyimpan.');
    return;
  }

  alert('Data berhasil disimpan!');
  setTimeout(() => {
    navigate('/bidan/laporan-rekam-medis');
  }, 100);
};
  return (
    <div className="d-flex">
      <Nav className="flex-column p-3" style={{ position: 'fixed', top: 0, bottom: 0, width: sidebarOpen ? '255px' : '80px', backgroundColor: '#fff', boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.2)', overflowY: 'auto', transition: 'width 0.3s' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold mb-0" style={{ color: primaryColor }}>{sidebarOpen ? 'Imunisasi Bayi' : ''}</h3>
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
                <Nav.Link onClick={() => setShowModal(true)} className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
                  <FaUserPlus className="me-2" /> {sidebarOpen ? "Penjadwalan Pasien" : ""}
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
                  <Nav.Link
          as={Link}
          to="/bidan/imunisasi-bayi"
          className="fw-semibold mb-3 pb-3 border-bottom rounded px-2"
          style={{
            backgroundColor: primaryColor, // warna kotak
            color: 'white'                 // warna teks
          }}
        >
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
            <div data-step="1">
              <h5 className="mb-3">I. IDENTITAS ANAK DAN ORANG TUA</h5>
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
                <Form.Label>Nama Anak</Form.Label>
                <Form.Control name="namaAnak" value={formData.namaAnak || ''} onChange={handleChange} required placeholder='Tulis nama lengkap pasien'/>
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
                <Form.Control type="number" name="umurAnak" value={formData.umurAnak || ''} onChange={handleChange} required placeholder='Isi umur anak dalam bulan'/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Alamat Rumah</Form.Label>
                <Form.Control name="alamat" value={formData.alamat || ''} onChange={handleChange} required placeholder='Isi alamat rumah pasien'/>
              </Form.Group>
              </div>
            </>
          )}
            {step === 2 && (
            <>
            <div data-step="2">
              <h5 className="mb-3">II. CATATAN RIWAYAT</h5>
       <Form.Group className="mb-3">
  <Form.Label className="mt-2">GPA</Form.Label>
  <Form.Control
    type="text"
    name="gpa"
    value={formData.gpa || ''}
    onChange={handleChange}
    placeholder="Contoh: G2P1A0"
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Label className="mt-3">Masa Gestasi</Form.Label>
  <Form.Control
    type="text"
    name="masaGestasi"
    value={formData.masaGestasi || ''}
    onChange={handleChange}
    placeholder="Contoh: 36 minggu"
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Label className="mt-3">Riwayat ANC</Form.Label>
  <Form.Control
    type="text"
    name="riwayatANC"
    value={formData.riwayatANC || ''}
    onChange={handleChange}
    placeholder="Contoh: ANC lengkap (6 kali)"
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Label className="mt-3">Riwayat Penyakit Ibu dan Keluarga</Form.Label>
  <Form.Control
    as="textarea"
    rows={3}
    name="riwayatPenyakit"
    value={formData.riwayatPenyakit || ''}
    onChange={handleChange}
    placeholder="Contoh: Tidak ada riwayat penyakit kronis pada ibu dan keluarga"
  />
</Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Riwayat Postnatal</Form.Label>
                <Form.Control as="textarea" rows={2} name="riwayatPostnatal" value={formData.riwayatPostnatal || ''} onChange={handleChange} 
                placeholder="Contoh: Ibu dalam keadaan sehat, luka perineum sembuh baik, kontrol postnatal sudah dilakukan dua kali"/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Perkembangan Bayi</Form.Label>
                <Form.Control as="textarea" rows={2} name="perkembanganBayi" value={formData.perkembanganBayi || ''} onChange={handleChange} 
                placeholder="Contoh: Berat badan bertambah sesuai grafik KMS, sudah dapat tengkurap dan merespon suara"
                />
              </Form.Group>

              <Form.Group className="mb-3">
  <Form.Label className="mt-3">Psikologis</Form.Label>
  <Form.Control
    type="text"
    name="psikologis"
    value={formData.psikologis || ''}
    onChange={handleChange}
    placeholder="Contoh: Ibu tampak cemas menghadapi persalinan"
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label className="mt-3">Sosial</Form.Label>
  <Form.Control
    type="text"
    name="sosial"
    value={formData.sosial || ''}
    onChange={handleChange}
    placeholder="Contoh: Didampingi suami dan keluarga"
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label className="mt-3">Spiritual</Form.Label>
  <Form.Control
    type="text"
    name="spiritual"
    value={formData.spiritual || ''}
    onChange={handleChange}
    placeholder="Contoh: Berdoa secara rutin, percaya diri"
  />
</Form.Group>
</div>
            </>
          )}
{step === 3 && (
            <>
            <div data-step="3">
              <h5 className="mb-3">III. KONDISI BAYI</h5>

             {/* Keadaan Saat Ini */}
<Form.Group className="mb-3">
  <Form.Label>Gerak Bayi</Form.Label>
  <Form.Control type="text" placeholder="Contoh: Aktif, lemah" name="gerakBayi" value={formData.gerakBayi || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Tangis Bayi</Form.Label>
  <Form.Control type="text" placeholder="Contoh: Kuat, lemah, tidak menangis" name="tangisBayi" value={formData.tangisBayi || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Warna Kulit</Form.Label>
  <Form.Control type="text" placeholder="Contoh: Merah muda, kebiruan" name="warnaKulit" value={formData.warnaKulit || ''} onChange={handleChange} />
</Form.Group>

{/* Pemeriksaan Umum */}
<Form.Group className="mb-3">
  <Form.Label>Berat Badan (BB)</Form.Label>
  <Form.Control type="text" placeholder="Contoh: 3.2 kg" name="bb" value={formData.bb || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Panjang Badan (PB)</Form.Label>
  <Form.Control type="text" placeholder="Contoh: 50 cm" name="pb" value={formData.pb || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Lingkar Kepala (LK)</Form.Label>
  <Form.Control type="text" placeholder="Contoh: 33 cm" name="lk" value={formData.lk || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Lingkar Dada (LD)</Form.Label>
  <Form.Control type="text" placeholder="Contoh: 31 cm" name="ld" value={formData.ld || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>HR (Heart Rate)</Form.Label>
  <Form.Control type="text" placeholder="Contoh: 140 bpm" name="hr" value={formData.hr || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Suhu</Form.Label>
  <Form.Control type="text" placeholder="Contoh: 36.5°C" name="suhu" value={formData.suhu || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>RR (Respiratory Rate)</Form.Label>
  <Form.Control type="text" placeholder="Contoh: 40 x/menit" name="rr" value={formData.rr || ''} onChange={handleChange} />
</Form.Group>

{/* Pemeriksaan Fisik */}
<Form.Group className="mb-3">
  <Form.Label>Kepala</Form.Label>
  <Form.Control type="text" placeholder="Contoh: Normal, caput" name="kepala" value={formData.kepala || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Mata</Form.Label>
  <Form.Control type="text" placeholder="Contoh: Simetris, tidak bernanah" name="mata" value={formData.mata || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Mulut</Form.Label>
  <Form.Control type="text" placeholder="Contoh: Normal, tidak ada sariawan" name="mulut" value={formData.mulut || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Telinga</Form.Label>
  <Form.Control type="text" placeholder="Contoh: Simetris, tidak keluar cairan" name="telinga" value={formData.telinga || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Dada</Form.Label>
  <Form.Control type="text" placeholder="Contoh: Normal, simetris" name="dada" value={formData.dada || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Perut</Form.Label>
  <Form.Control type="text" placeholder="Contoh: Lunak, tidak kembung" name="perut" value={formData.perut || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Genetalia</Form.Label>
  <Form.Control type="text" placeholder="Contoh: Normal, tidak ada kelainan" name="genetalia" value={formData.genetalia || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Ekstremitas</Form.Label>
  <Form.Control type="text" placeholder="Contoh: Lengkap, aktif bergerak" name="ekstremitas" value={formData.ekstremitas || ''} onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Babinski</Form.Label>
  <Form.Control type="text" placeholder="Contoh: Positif / Negatif" name="babinski" value={formData.babinski || ''} onChange={handleChange} />
</Form.Group>

{/* Pemeriksaan Penunjang */}
<Form.Group className="mb-3">
  <Form.Label>Pemeriksaan Penunjang</Form.Label>
  <Form.Control type="text" placeholder="Contoh: Laboratorium darah, tes lainnya" name="pemeriksaanPenunjang" value={formData.pemeriksaanPenunjang || ''} onChange={handleChange} />
</Form.Group>

              </div>
            </>
          )}

{step === 4 && (
  <>
  <div data-step="4">
    <h5 className="mb-3">IV. Diagnosa dan Masalah</h5>
    <Form.Group className="mb-3">
      <Form.Label>Diagnosa</Form.Label>
      <Form.Control as="textarea" rows={2} name="diagnosa" value={formData.diagnosa || ''} onChange={handleChange} />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Masalah</Form.Label>
      <Form.Control as="textarea" rows={2} name="masalah" value={formData.masalah || ''} onChange={handleChange} />
    </Form.Group>
    </div>
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
      {/* Modal Pendaftaran */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Booking Jadwal Pasien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PendaftaranolehBidan />  {/* Panggil komponen pendaftaran */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ImunisasiBayi;