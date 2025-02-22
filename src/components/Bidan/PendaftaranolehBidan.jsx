import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import profilePicture from "../../assets/img/profile-svgrepo-com.svg"

export default function PendaftaranolehBidan() {
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    keluhan: "",
    tanggal: "",
    jam: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Pendaftaran:", form);
    // Tambahkan logika untuk menyimpan data pendaftaran
  };

  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
  };

  return (
    <div>
      <Container className="mt-5">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#">Dashboard Klik Bidan Desak</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/bidan/pendaftaranolehbidan">
                  Pendaftaran Pasien
                </Nav.Link>
                <Nav.Link as={Link} to="/bidan/pemeriksaan">
                  Pemeriksaan
                </Nav.Link>
                <Nav.Link as={Link} to="/bidan/persalinan">
                  Persalinan
                </Nav.Link>
                <Nav.Link as={Link} to="/bidan/pasca-persalinan">
                  Pasca Persalinan
                </Nav.Link>
                <Nav.Link as={Link} to="/bidan/laporan-rekam-medis">
                  Laporan Rekam Medis
                </Nav.Link>
                <Nav.Link as={Link} to="/bidan/imunisasi-bayi">
                  Imunisasi Bayi
                </Nav.Link>
              </Nav>
              <Nav>
                <NavDropdown
                  title={
                    <img
                      src={profilePicture}
                      alt="Profile Picture"
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                      }}
                    />
                  }
                  id="profile-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/bidan/profil">
                    Ubah Profil
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#notifikasi">
                    Notifikasi
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logOut}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>

      <Container className="mt-5">
        <h1 className="mb-4">Pendaftaran Pasien</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nama</label>
                <input
                  type="text"
                  className="form-control"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">NIK</label>
                <input
                  type="text"
                  className="form-control"
                  name="nik"
                  value={form.nik}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Keluhan</label>
                <input
                  type="text"
                  className="form-control"
                  name="keluhan"
                  value={form.keluhan}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tanggal</label>
                <input
                  type=" date"
                  className="form-control"
                  name="tanggal"
                  value={form.tanggal}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Jam</label>
                <input
                  type="time"
                  className="form-control"
                  name="jam"
                  value={form.jam}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Daftarkan Pasien
              </button>
            </form>
            <button className="btn btn-outline-secondary w-100 mt-3">
              Lihat Jadwal Terkini
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}