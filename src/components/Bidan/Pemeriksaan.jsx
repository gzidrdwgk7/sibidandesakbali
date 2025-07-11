import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Navbar, Nav, InputGroup, NavDropdown, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBars, FaUserPlus, FaUsers, FaClipboardList, FaStethoscope, FaBaby,
  FaBookMedical, FaSyringe, FaBell, FaClock, FaTachometerAlt, FaSearch, FaUserCircle
} from 'react-icons/fa';
import PendaftaranolehBidan from './PendaftaranolehBidan'; 


const Pemeriksaan = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);  // Menambahkan state untuk kontrol modal
  const primaryColor = "black";
  
  const [isValid, setIsValid] = useState(true);
  
const nextStep = () => {
  if (validateForm()) {
    if (step === 8) {
      const currentStep9Data = {
        bio: bio,
        psiko: psiko,
        sosial: sosial,
        spiritual: spiritual
      };

      setFormData(prevData => ({
        ...prevData,
        step9: currentStep9Data
      }));

      alert("Data berhasil disimpan");

      // Pindah ke halaman Laporan Rekam Medis
      navigate("/bidan/laporan-rekam-medis");
    } else {
      setStep(prev => prev + 1);
    }
  } else {
    alert("Harap lengkapi semua field yang wajib diisi.");
  }
};

const [formData, setFormData] = useState({});
const [bio, setBio] = useState("");
const [psiko, setPsiko] = useState("");
const [sosial, setSosial] = useState("");
const [spiritual, setSpiritual] = useState("");

  const prevStep = () => setStep((prev) => prev - 1);

  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
  };

  // Validasi form
  const validateForm = () => {
    const requiredFields = document.querySelectorAll('input[required], textarea[required], select[required]');
    let isFormValid = true;

    // Iterasi untuk memeriksa setiap field
    for (let field of requiredFields) {
      if (field.tagName === 'SELECT' && (field.value === '' || field.value === 'Pilih Suku' || field.value === 'Pilih Agama')) {
        isFormValid = false;
        field.classList.add('is-invalid');  // Menandai field yang tidak valid
      } else if (field.tagName !== 'SELECT' && !field.value.trim()) {
        isFormValid = false;
        field.classList.add('is-invalid');  // Menandai field yang tidak valid
      } else {
        field.classList.remove('is-invalid');  // Menghapus tanda invalid jika field valid
      }
    }

    setIsValid(isFormValid);
    return isFormValid;
  };

  const [currentDateTime, setCurrentDateTime] = useState({
    day: '',
    date: '',
    time: ''
  });

  // Function to format current date and time
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
const [daftarPasien, setDaftarPasien] = useState([]);
const [namaPasien, setNamaPasien] = useState("");

useEffect(() => {
  const data = JSON.parse(localStorage.getItem("antrianPasien")) || [];
  setDaftarPasien(data);
}, []);

  // Set the current date and time on component mount
  useEffect(() => {
    formatDateTime();  // Call it once on mount

    // Optionally, update the time every second (if you want to keep time updated)
    const interval = setInterval(formatDateTime, 1000);
    
    return () => clearInterval(interval);  // Cleanup the interval on unmount
  }, []);
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
          <h3 className="fw-bold mb-0" style={{ color: primaryColor }}>
            {sidebarOpen ? "Pemeriksaan" : ""}
          </h3>
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
          <FaUserPlus className="me-2" /> {sidebarOpen ? "Penjadwalan Pasien" : ""}
        </Nav.Link>
        <Nav.Link as={Link} to="/bidan/antrianpasien" className="fw-semibold mb-3 pb-3 border-bottom" style={{ color: primaryColor }}>
          <FaClock className="me-2" /> {sidebarOpen ? 'Antrian Pasien' : ''}
        </Nav.Link>
       <Nav.Link
  as={Link}
  to="/bidan/pemeriksaan"
  className="fw-semibold mb-3 pb-3 border-bottom rounded px-2"
  style={{
    backgroundColor: primaryColor, // warna kotak
    color: 'white'                 // warna teks
  }}
>
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
{step === 1 && (
        <>
          <h3 className="mb-4">I. IDENTITAS IBU DAN SUAMI</h3>
          <Form>
            <Row className="mb-3">
            <Col><Form.Label>Hari</Form.Label><Form.Control type="text" value={currentDateTime.day} disabled /></Col>
                  <Col><Form.Label>Tanggal</Form.Label><Form.Control type="text" value={currentDateTime.date} disabled /></Col>
                  <Col><Form.Label>Jam</Form.Label><Form.Control type="text" value={currentDateTime.time} disabled /></Col>
            </Row>

            <h5 className="mt-4">Identitas Ibu</h5>
            <Row className="mb-3">
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


              <Col><Form.Label>Umur</Form.Label><Form.Control required placeholder='Isikan umur pasien'/></Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Suku Bangsa</Form.Label>
                <Form.Select required>
                <option value="">Pilih Suku angsa</option>
                <option>Aceh</option>
                <option>Batak</option>
                <option>Minangkabau</option>
                <option>Melayu</option>
                <option>Jawa</option>
                <option>Sunda</option>
                <option>Betawi</option>
                <option>Madura</option>
                <option>Dayak</option>
                <option>Banjar</option>
                <option>Bugis</option>
                <option>Makassar</option>
                <option>Minahasa</option>
                <option>Toraja</option>
                <option>Bali</option>
                <option>Sasak</option>
                <option>Ambon</option>
                <option>Dani</option>
                <option>Asmat</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Agama</Form.Label>
                <Form.Select required>
                  <option value="">Pilih Agama</option>
                  <option>Islam</option>
                  <option>Hindu</option>
                  <option>Protestan</option>
                  <option>Katolik</option>
                  <option>Buddha</option>
                  <option>Konghucu</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Pendidikan</Form.Label>
                <Form.Select required>
                  <option value="">Pilih Pendidikan</option>
                  <option>Tidak Sekolah</option>
                  <option>SD</option>
                  <option>SMP</option>
                  <option>SMA</option>
                  <option>D1</option>
                  <option>D2</option>
                  <option>D3</option>
                  <option>D4</option>
                  <option>S1</option>
                  <option>S2</option>
                  <option>S3</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Pekerjaan</Form.Label>
                <Form.Select required>
                  <option value="">Pilih Pekerjaan</option>
                  <option>ASN</option>
                  <option>Karyawan Swasta</option>
                  <option>Wirausaha</option>
                  <option>Ibu Rumah Tangga</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col><Form.Label>Alamat Rumah</Form.Label><Form.Control required placeholder='Isikan alamat rumah pasien'/></Col>
              <Col>
  <Form.Label>No. Telp/HP</Form.Label>
  <Form.Control
    required
    type="tel"
    pattern="[0-9]*"
    inputMode="numeric"
    placeholder="Contoh: 081234567890"
  />
</Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Golongan Darah</Form.Label>
                <Form.Select required>
                  <option value="">Pilih Golongan Darah</option>
                  <option>A</option>
                  <option>B</option>
                  <option>O</option>
                  <option>A/B</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Jaminan Kesehatan</Form.Label>
                <Form.Select required>
                  <option value="">Pilih Jaminan</option>
                  <option>Mandiri</option>
                  <option>BPJS Kesehatan</option>
                </Form.Select>
              </Col>
            </Row>

            <h5 className="mt-4">Identitas Suami</h5>

            <Row className="mb-3">
             <Col> <Form.Label>Nama</Form.Label> <Form.Control required placeholder="Isikan nama lengkap pasien" /> </Col>
              <Col><Form.Label>Umur</Form.Label><Form.Control required placeholder="Isikan umur pasien"/></Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Suku Bangsa</Form.Label>
                <Form.Select required>
                <option value="">Pilih Suku angsa</option>
                <option>Aceh</option>
                <option>Batak</option>
                <option>Minangkabau</option>
                <option>Melayu</option>
                <option>Jawa</option>
                <option>Sunda</option>
                <option>Betawi</option>
                <option>Madura</option>
                <option>Dayak</option>
                <option>Banjar</option>
                <option>Bugis</option>
                <option>Makassar</option>
                <option>Minahasa</option>
                <option>Toraja</option>
                <option>Bali</option>
                <option>Sasak</option>
                <option>Ambon</option>
                <option>Dani</option>
                <option>Asmat</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Agama</Form.Label>
                <Form.Select required>
                  <option value="">Pilih Agama</option>
                  <option>Islam</option>
                  <option>Hindu</option>
                  <option>Protestan</option>
                  <option>Katolik</option>
                  <option>Buddha</option>
                  <option>Konghucu</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Pendidikan</Form.Label>
                <Form.Select required>
                  <option value="">Pilih Pendidikan</option>
                  <option>Tidak Sekolah</option>
                  <option>SD</option>
                  <option>SMP</option>
                  <option>SMA</option>
                  <option>D1</option>
                  <option>D2</option>
                  <option>D3</option>
                  <option>D4</option>
                  <option>S1</option>
                  <option>S2</option>
                  <option>S3</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Pekerjaan</Form.Label>
                <Form.Select required>
                  <option value="">Pilih Pekerjaan</option>
                  <option>ASN</option>
                  <option>Karyawan Swasta</option>
                  <option>Wirausaha</option>
                  <option>Ibu Rumah Tangga</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col><Form.Label>Alamat Rumah</Form.Label><Form.Control required placeholder='Isikan alamat rumah pasien'/></Col>
              <Col>
  <Form.Label>No. Telp/HP</Form.Label>
  <Form.Control
    required
    type="tel"
    pattern="[0-9]*"
    inputMode="numeric"
    placeholder="Contoh: 081234567890"
  />
</Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Golongan Darah</Form.Label>
                <Form.Select required>
                  <option value="">Pilih Golongan Darah</option>
                  <option>A</option>
                  <option>B</option>
                  <option>O</option>
                  <option>A/B</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Jaminan Kesehatan</Form.Label>
                <Form.Select required>
                  <option value="">Pilih Jaminan</option>
                  <option>Mandiri</option>
                  <option>BPJS Kesehatan</option>
                </Form.Select>
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={() => navigate('/dashboard-bidan')}>
    Kembali
  </Button>
  <Button variant="primary" onClick={nextStep}>
    Lanjutkan
  </Button>
</div>
          </Form>
        </>
      )}
  {step === 2 && (
    <>
      <h3 className="mb-4">II. ALASAN DATANG KE PELAYANAN KESEHATAN</h3>

      <Form>
      <Row className="mb-3">
              <Col><Form.Label>Hari</Form.Label><Form.Control type="text" value={currentDateTime.day} disabled /></Col>
                  <Col><Form.Label>Tanggal</Form.Label><Form.Control type="text" value={currentDateTime.date} disabled /></Col>
                  <Col><Form.Label>Jam</Form.Label><Form.Control type="text" value={currentDateTime.time} disabled /></Col>
          </Row>
        <h5 className="mt-4">1. Alasan Memeriksakan Diri</h5>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Tuliskan alasan memeriksakan diri"
            required
          />
        </Form.Group>

        <h5 className="mt-4">2. Keluhan Utama</h5>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Tuliskan keluhan utama"
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-4">
    <Button variant="secondary" onClick={prevStep}>
      Kembali
    </Button>
    <Button variant="primary" onClick={nextStep}>
      Lanjutkan
    </Button>
    </div>
              </Form> 
    </>
  )}
  {step === 3 && (
  <>
    <h3 className="mb-4">III. RIWAYAT MENSTRUASI</h3>

    <Form>
      <Row className="mb-3">
        <Col><Form.Label>Menarche</Form.Label><Form.Control placeholder='Isikan menarche'/></Col>
        <Col><Form.Label>Siklus</Form.Label><Form.Control placeholder='Isikan siklus menstruasi'/></Col>
      </Row>

      <Row className="mb-3">
        <Col><Form.Label>Lama Haid</Form.Label><Form.Control placeholder='Isikan lama haid'/></Col>
        <Col><Form.Label>Dismenorhea</Form.Label><Form.Control placeholder='Isikan dismenorhea'/></Col>
      </Row>

      <Row className="mb-3">
        <Col><Form.Label>Jumlah Darah yang Keluar</Form.Label><Form.Control placeholder='Isikan jumlah darah yang keluar'/></Col>
        <Col><Form.Label>HPHT</Form.Label><Form.Control type="date" placeholder='Isikan HPHT'/></Col>
      </Row>

      <Row className="mb-3">
        <Col><Form.Label>TP</Form.Label><Form.Control type="date" placeholder='Isikan TP'/></Col>
      </Row>

      <div className="d-flex justify-content-between mt-4">
      <Button variant="secondary" onClick={prevStep}>
      Kembali
    </Button>
    <Button variant="primary" onClick={nextStep}>
      Lanjutkan
    </Button>
    </div>
    </Form>
  </>
)}
{step === 4 && (
  <>
    <h3 className="mb-4">IV. RIWAYAT PERKAWINAN</h3>

    <Form>
    <Row className="mb-3">
  <Col>
    <Form.Label>Pernikahan ke-</Form.Label>
    <Form.Control placeholder="Isikan pernikahan ke berapa" />
  </Col>
  
  <Col>
    <Form.Label>Status Pernikahan</Form.Label>
    <Form.Select defaultValue="">
      <option value="" disabled>Pilih status pernikahan</option>
      <option value="Belum Kawin">Belum kawin (lajang)</option>
      <option value="Kawin">Kawin (menikah)</option>
      <option value="Cerai Hidup">Cerai hidup</option>
      <option value="Cerai Mati">Cerai mati</option>
    </Form.Select>
  </Col>
</Row>

      <Row className="mb-3">
        <Col><Form.Label>Lama Pernikahan</Form.Label><Form.Control placeholder='Isikan lama pernikahan'/></Col>
        <Col><Form.Label>Jumlah Anak</Form.Label><Form.Control placeholder='Isikan jumlah anak'/></Col>
      </Row>

      <div className="d-flex justify-content-between mt-4">
      <Button variant="secondary" onClick={prevStep}>
      Kembali
    </Button>
    <Button variant="primary" onClick={nextStep}>
      Lanjutkan
    </Button>
    </div>
    </Form>
  </>
)}
{step === 5 && (
  <>
    <h3 className="mb-4">V. RIWAYAT KEHAMILAN, PERSALINAN, DAN KEADAAN BAYI</h3>
    <Form>
  <Row className="mb-3">
    <Col md={6}>
      <Form.Label>Hamil Ke-</Form.Label>
      <Form.Control placeholder="Contoh: 1, 2, 3, dst." />
    </Col>
    <Col md={6}>
      <Form.Label>Tgl Lahir / Umur Anak</Form.Label>
      <Form.Control placeholder="Contoh: 12 Jan 2020 / 3 thn" />
    </Col>
  </Row>

  <Row className="mb-3">
    <Col md={6}>
      <Form.Label>UK (bln)</Form.Label>
      <Form.Control placeholder="Contoh: 9" />
    </Col>
    <Col md={6}>
      <Form.Label>Jenis Persalinan</Form.Label>
      <Form.Control placeholder="Contoh: Normal, SC, dll" />
    </Col>
  </Row>

  <Row className="mb-3">
    <Col md={6}>
      <Form.Label>Tempat / Penolong</Form.Label>
      <Form.Control placeholder="Contoh: RSUD / Bidan" />
    </Col>
    <Col md={6}>
      <Form.Label>Kondisi Saat Bersalin</Form.Label>
      <Form.Control placeholder="Contoh: Lancar, ada komplikasi, dll" />
    </Col>
  </Row>

  <h6 className="mt-4">Keadaan Bayi Saat Lahir</h6>

  <Row className="mb-3">
    <Col md={6}>
      <Form.Label>PB</Form.Label>
      <Form.Control placeholder="Panjang Badan (cm)" />
    </Col>
    <Col md={6}>
      <Form.Label>BB</Form.Label>
      <Form.Control placeholder="Berat Badan (gr)" />
    </Col>
  </Row>

  <Row className="mb-3">
    <Col md={6}>
      <Form.Label>JK</Form.Label>
      <Form.Control placeholder="Jenis Kelamin" />
    </Col>
    <Col md={6}>
      <Form.Label>Kondisi Saat Lahir</Form.Label>
      <Form.Control placeholder="Contoh: Sehat, menangis, dll" />
    </Col>
  </Row>

  <Row className="mb-3">
    <Col md={6}>
      <Form.Label>Kondisi Sekarang</Form.Label>
      <Form.Control placeholder="Contoh: Sehat, aktif, dll" />
    </Col>
    <Col md={6}>
      <Form.Label>Kondisi Nifas</Form.Label>
      <Form.Control placeholder="Contoh: Normal, ada infeksi, dll" />
    </Col>
  </Row>

  <h5 className="mt-4">Riwayat Laktasi</h5>

  <Row className="mb-3">
    <Col md={6}>
      <Form.Label>Pengalaman menyusui dini</Form.Label>
      <Form.Control placeholder="Contoh: Ya, langsung setelah melahirkan" />
    </Col>
    <Col md={6}>
      <Form.Label>Pemberian ASI eksklusif</Form.Label>
      <Form.Control placeholder="Contoh: 6 bulan pertama" />
    </Col>
  </Row>

  <Row className="mb-3">
    <Col md={6}>
      <Form.Label>Lama menyusui</Form.Label>
      <Form.Control placeholder="Contoh: 2 tahun" />
    </Col>
    <Col md={6}>
      <Form.Label>Kendala</Form.Label>
      <Form.Control placeholder="Contoh: Puting lecet, ASI kurang lancar, dll." />
    </Col>
  </Row>

  <div className="d-flex justify-content-between mt-4">
      <Button variant="secondary" onClick={prevStep}>
      Kembali
    </Button>
    <Button variant="primary" onClick={nextStep}>
      Lanjutkan
    </Button>
    </div>
    </Form>

  </>
)}
{step === 6 && (
  <>
    <h3 className="mb-4">VI. RIWAYAT KEHAMILAN SEKARANG</h3>

    <Form>

      <Form.Group className="mb-3">
        <Form.Label>Iktisar pemeriksaan kehamilan sebelumnya</Form.Label>
        <Form.Control as="textarea" rows={10} placeholder="Tulis iktisar hasil pemeriksaan sebelumnya..." />
      </Form.Group>

      <Row className="mb-3">
        <Col>
          <Form.Label>Gerakan janin dirasakan pertama kali sejak</Form.Label>
          <Form.Control placeholder="Contoh: Minggu ke-18" />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Label>Gerakan janin dalam 24 jam</Form.Label>
          <Form.Control placeholder="Contoh: Aktif, lebih dari 10 kali" />
        </Col>
      </Row>

      <h5 className="mt-4">Tanda Bahaya yang Pernah Dirasakan</h5>
      <p><strong>Trimester I:</strong></p>
      <Row className="mb-2">
        <Col><Form.Check label="Mual muntah berlebihan" /></Col>
        <Col><Form.Check label="Suhu badan meningkat" /></Col>
        <Col><Form.Check label="Kotoran berdarah" /></Col>
        <Col><Form.Check label="Nyeri perut" /></Col>
      </Row>
      <Row className="mb-3">
        <Col><Form.Check label="Sulit kencing / sakit saat kencing" /></Col>
        <Col><Form.Check label="Keputihan berlebihan, bau, gatal" /></Col>
        <Col><Form.Check label="Perdarahan" /></Col>
      </Row>

      <p><strong>Trimester II dan III:</strong></p>
      <Row className="mb-2">
        <Col><Form.Check label="Demam" /></Col>
        <Col><Form.Check label="Kotoran berdarah" /></Col>
        <Col><Form.Check label="Bengkak pada muka dan tangan" /></Col>
        <Col><Form.Check label="Varises" /></Col>
      </Row>
      <Row className="mb-2">
        <Col><Form.Check label="Gusi berdarah berlebihan" /></Col>
        <Col><Form.Check label="Keputihan berlebihan, bau, gatal" /></Col>
        <Col><Form.Check label="Keluar air ketuban" /></Col>
        <Col><Form.Check label="Perdarahan" /></Col>
      </Row>
      <Row className="mb-3">
        <Col><Form.Check label="Nyeri perut" /></Col>
        <Col><Form.Check label="Nyeri ulu hati" /></Col>
        <Col><Form.Check label="Sakit kepala yang hebat" /></Col>
        <Col><Form.Check label="Pusing" /></Col>
        <Col><Form.Check label="Cepat lelah" /></Col>
        <Col><Form.Check label="Mata berkunang-kunang" /></Col>
      </Row>

      <h5 className="mt-4">Keluhan Umum</h5>
      <p><strong>Trimester I:</strong></p>
      <Row className="mb-3">
        <Col><Form.Check label="Sering kencing" /></Col>
        <Col><Form.Check label="Mengidam" /></Col>
        <Col><Form.Check label="Keringat bertambah" /></Col>
        <Col><Form.Check label="Pusing" /></Col>
      </Row>

      <p><strong>Trimester II dan III:</strong></p>
      <Row className="mb-2">
        <Col><Form.Check label="Cloasma" /></Col>
        <Col><Form.Check label="Edema dependen" /></Col>
        <Col><Form.Check label="Striae linea" /></Col>
        <Col><Form.Check label="Gusi berdarah" /></Col>
      </Row>
      <Row className="mb-2">
        <Col><Form.Check label="Ludah berlebihan" /></Col>
        <Col><Form.Check label="Mual muntah" /></Col>
        <Col><Form.Check label="Keputihan meningkat" /></Col>
      </Row>
      <Row className="mb-3">
        <Col><Form.Check label="Kram pada kaki" /></Col>
        <Col><Form.Check label="Sakit punggung atas & bawah" /></Col>
        <Col><Form.Check label="Sering kencing" /></Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Obat dan suplemen yang diminum selama kehamilan ini</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Contoh: Asam folat, vitamin C, kalsium..." />
      </Form.Group>

      <h5 className="mt-4">Perilaku yang Membahayakan Kehamilan</h5>
      <Row className="mb-3">
        <Col><Form.Check label="Merokok aktif/pasif" /></Col>
        <Col><Form.Check label="Minum minuman keras" /></Col>
        <Col><Form.Check label="Narkoba" /></Col>
        <Col><Form.Check label="Minum jamu" /></Col>
        <Col><Form.Check label="Diurut dukun" /></Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Pernah kontak dengan binatang</Form.Label>
        <Form.Control placeholder="Contoh: Tidak / Ya, dengan kucing" />
      </Form.Group>

      <div className="d-flex justify-content-between mt-4">
      <Button variant="secondary" onClick={prevStep}>
      Kembali
    </Button>
    <Button variant="primary" onClick={nextStep}>
      Lanjutkan
    </Button>
    </div>
    </Form>
  </>
)}
{step === 7 && (
  <>
    <h3 className="mb-4">VII. RIWAYAT KESEHATAN</h3>
 <Row className="mb-3">
        <Col md={12}>
          <Form.Label>Bernafas</Form.Label>
          <Form.Control placeholder="Ada keluhan / Tidak" />
        </Col>
      </Row>

      {/* (2) Pola Makan dan Minum */}
      <h5 className="mt-3">Pola Makan dan Minum</h5>
      <Row className="mb-3">
        <Col md={6}><Form.Label>Menu yang sering dikonsumsi</Form.Label><Form.Control placeholder='Tulis menu yang sering dikonsumsi'/></Col>
        <Col md={6}><Form.Label>Komposisi</Form.Label><Form.Control placeholder='Tulis komposisinya'/></Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}><Form.Label>Porsi</Form.Label><Form.Control placeholder='Tulis porsinya'/></Col>
        <Col md={6}><Form.Label>Frekuensi</Form.Label><Form.Control placeholder='Tulis frekuensi konsumsi'/></Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}><Form.Label>Pola Minum</Form.Label><Form.Control placeholder='Tulis pola minum'/></Col>
        <Col md={6}><Form.Label>Pantangan / Alergi</Form.Label><Form.Control placeholder='Tulis pantangan/alergi tertentu'/></Col>
      </Row>
    <Form>
      <h5 className="mt-4">Penyakit/Gejala Penyakit yang Pernah Diderita Ibu</h5>
      <Row className="mb-2">
        <Col><Form.Check label="Penyakit jantung" /></Col>
        <Col><Form.Check label="Terinfeksi TORCH" /></Col>
        <Col><Form.Check label="Hipertensi" /></Col>
        <Col><Form.Check label="Diabetes melitus" /></Col>
      </Row>
      <Row className="mb-2">
        <Col><Form.Check label="Asthma" /></Col>
        <Col><Form.Check label="TBC" /></Col>
        <Col><Form.Check label="Hepatitis" /></Col>
        <Col><Form.Check label="Epilepsi" /></Col>
      </Row>
      <Row className="mb-3">
        <Col><Form.Check label="PMS" /></Col>
        <Col><Form.Check label="Infertilitas" /></Col>
        <Col><Form.Check label="Cervicitis kronis" /></Col>
        <Col><Form.Check label="Endometritis" /></Col>
      </Row>
      <Row className="mb-3">
        <Col><Form.Check label="Myoma" /></Col>
        <Col><Form.Check label="Kanker kandungan" /></Col>
        <Col><Form.Check label="Perkosaan" /></Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Riwayat Operasi</Form.Label>
        <Form.Control placeholder="Contoh: Operasi caesar, operasi usus..." />
      </Form.Group>

      <h5 className="mt-4">Penyakit/Gejala Penyakit yang Pernah Diderita Keluarga Ibu dan Suami</h5>
      <h6>Keturunan</h6>
      <Row className="mb-2">
        <Col><Form.Check label="Penyakit jantung" /></Col>
        <Col><Form.Check label="Diabetes Militus" /></Col>
        <Col><Form.Check label="Asthma" /></Col>
        <Col><Form.Check label="Hipertensi" /></Col>
      </Row>
      <Row className="mb-2">
        <Col><Form.Check label="Epilepsi" /></Col>
        <Col><Form.Check label="Gangguan jiwa" /></Col>
      </Row>

      <h6>Sering Kontak dengan Penderita Keluarga Ibu dan Suami</h6>
      <Row className="mb-2">
        <Col><Form.Check label="HIV/ AIDS" /></Col>
        <Col><Form.Check label="TBC" /></Col>
        <Col><Form.Check label="Hepatitis" /></Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Riwayat Keturunan Kembar</Form.Label>
        <Form.Control placeholder="Contoh: Ya / Tidak" />
      </Form.Group>

      <div className="d-flex justify-content-between mt-4">
      <Button variant="secondary" onClick={prevStep}>
      Kembali
    </Button>
    <Button variant="primary" onClick={nextStep}>
      Lanjutkan
    </Button>
    </div>
    </Form>
  </>
)}
{step === 8 && (
  <>
    <h3 className="mb-4">VIII. DIAGNOSIS DAN MASALAH</h3>

    <Form>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Label>Diagnosis</Form.Label>
          <Form.Control placeholder="Isi hasil diagnosis" />
        </Col>
      
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Label>Masalah</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Isi masalah jika ada" />
        </Col>
      </Row>

      <div className="d-flex justify-content-between mt-4">
      <Button variant="secondary" onClick={prevStep}>
      Kembali
    </Button>
    <Button variant="success" onClick={nextStep}>
      Simpan
    </Button>
    </div>
    </Form>
  </>
)}
{step === 9 && (
  <>
    <h3 className="mb-4">IX. DIAGNOSIS DAN MASALAH</h3>
    <Form>
      <Row className="mb-3">
        <Col>
          <Form.Label>Diagnosis dan Masalah</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Tuliskan diagnosis dan masalah"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
          />
        </Col>
      </Row>
      <div className="d-flex justify-content-between mt-4">
      <Button variant="secondary" onClick={prevStep}>
      Kembali
    </Button>
    <Button variant="primary" onClick={nextStep}>
      Simpan Data
    </Button>
    </div>
    </Form>
  </>
)}

</div>

      </div>

      {/* Modal Pendaftaran */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Booking Jadwal Pasien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PendaftaranolehBidan />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Pemeriksaan;
