import React, { useState, useRef } from "react";
import { Nav, Form, InputGroup, Navbar, NavDropdown, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaBars, FaSearch, FaTachometerAlt, FaUserPlus, FaClock,
  FaStethoscope, FaBaby, FaBookMedical,
  FaSyringe, FaBell, FaUserCircle, FaPrint
} from "react-icons/fa";
import PendaftaranolehBidan from './PendaftaranolehBidan';
const primaryColor = "#e064ac";

const RekamMedis = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const printRef = useRef();


  const logOut = () => {
    console.log("Logging out...");

  };
    const [showModal, setShowModal] = useState(false);  // Menambahkan state untuk kontrol modal
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // agar kembali normal setelah cetak
  };

  const pasien = {
    nama: "Ni Luh Ayu Sari",
    nik: "5101234567890001",
    umur: 26,
    status: "Hamil",
    pemeriksaan: [
      {
        tanggal: "2025-06-10",
        keluhan: "Mual dan pusing",
        tekananDarah: "110/70",
        diagnosa: "Kehamilan trimester 1 normal",
        tindakan: "Edukasi nutrisi, jadwal kontrol 2 minggu"
      }
    ],
    persalinan: [
      {
        tanggal: "2025-08-01",
        jenis: "Normal",
        tempat: "Praktek Bidan Desak",
        kondisiIbu: "Stabil",
        kondisiBayi: "Sehat",
        apgarScore: "9"
      }
    ],
    nifas: [
      {
        tanggal: "2025-08-04",
        tekananDarah: "120/80",
        lochia: "Merah segar",
        laktasi: "Lancar",
        edukasi: "Menjaga kebersihan, KB pasca nifas"
      }
    ],
    imunisasi: [
      {
        namaBayi: "Made Aditya",
        tanggalLahir: "2025-08-01",
        imunisasi: [
          { jenis: "HB-0", tanggal: "2025-08-02" },
          { jenis: "BCG", tanggal: "2025-08-15" }
        ]
      }
    ]
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
                   backgroundColor: primaryColor, // warna kotak
                   color: 'white'                 // warna teks
                 }}
               >
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
        {/* Step Form */}
 <div className="shadow-lg p-4 border-0 rounded-4 bg-white">
    

        <div ref={printRef}>
  <div className="row">
          <div className="col-md-6 mb-4">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h5 className="fw-bold mb-3">Data Pasien</h5>
              <p><strong>Nama:</strong> {pasien.nama}</p>
              <p><strong>NIK:</strong> {pasien.nik}</p>
              <p><strong>Umur:</strong> {pasien.umur} tahun</p>
              <p><strong>Status:</strong> {pasien.status}</p>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h5 className="fw-bold mb-3">Pemeriksaan</h5>
              {pasien.pemeriksaan.map((item, idx) => (
                <div key={idx} className="mb-2">
                  <p><strong>Tanggal:</strong> {item.tanggal}</p>
                  <p><strong>Keluhan:</strong> {item.keluhan}</p>
                  <p><strong>Tekanan Darah:</strong> {item.tekananDarah}</p>
                  <p><strong>Diagnosa:</strong> {item.diagnosa}</p>
                  <p><strong>Tindakan:</strong> {item.tindakan}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h5 className="fw-bold mb-3">Persalinan</h5>
              {pasien.persalinan.map((item, idx) => (
                <div key={idx}>
                  <p><strong>Tanggal:</strong> {item.tanggal}</p>
                  <p><strong>Jenis:</strong> {item.jenis}</p>
                  <p><strong>Tempat:</strong> {item.tempat}</p>
                  <p><strong>Kondisi Ibu:</strong> {item.kondisiIbu}</p>
                  <p><strong>Kondisi Bayi:</strong> {item.kondisiBayi}</p>
                  <p><strong>APGAR Score:</strong> {item.apgarScore}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h5 className="fw-bold mb-3">Pasca Persalinan (Nifas)</h5>
              {pasien.nifas.map((item, idx) => (
                <div key={idx}>
                  <p><strong>Tanggal:</strong> {item.tanggal}</p>
                  <p><strong>Tekanan Darah:</strong> {item.tekananDarah}</p>
                  <p><strong>Lochia:</strong> {item.lochia}</p>
                  <p><strong>Laktasi:</strong> {item.laktasi}</p>
                  <p><strong>Edukasi:</strong> {item.edukasi}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 mb-4">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h5 className="fw-bold mb-3">Imunisasi Bayi</h5>
              {pasien.imunisasi.map((bayi, idx) => (
                <div key={idx}>
                  <p><strong>Nama Bayi:</strong> {bayi.namaBayi}</p>
                  <p><strong>Tanggal Lahir:</strong> {bayi.tanggalLahir}</p>
                  <ul>
                    {bayi.imunisasi.map((imun, j) => (
                      <li key={j}>{imun.jenis} - {imun.tanggal}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
</div>
        </div>
      </div>
    </div>
         {/* Modal Pendaftaran */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Pendaftaran Pasien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PendaftaranolehBidan />  {/* Panggil komponen pendaftaran */}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default RekamMedis;