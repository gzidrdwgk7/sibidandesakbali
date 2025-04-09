import React, { useState } from 'react';
import { Row, Col, Card, Nav, Navbar, NavDropdown, Dropdown, Form, FormControl, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaUserCircle, FaUserPlus, FaUsers, FaClipboardList, FaStethoscope, FaBaby, FaBookMedical, FaSyringe, FaBell, FaClock, FaTachometerAlt, FaAngleRight, FaSignOutAlt, FaUserCog} from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import KalenderAntrianPasien from './Bidan/KalenderAntrianPasien';
import PendaftaranolehBidan from './Bidan/PendaftaranolehBidan';
import { Modal } from 'react-bootstrap';




const DashboardBidan = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);


  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const dataPasien = [
    { name: 'Senin', jumlah: 10 },
    { name: 'Selasa', jumlah: 15 },
    { name: 'Rabu', jumlah: 8 },
    { name: 'Kamis', jumlah: 12 },
    { name: 'Jumat', jumlah: 20 }
  ];

  const dataImunisasi = [
    { name: 'BCG', value: 10 },
    { name: 'DPT', value: 20 },
    { name: 'Polio', value: 15 },
    { name: 'Hepatitis', value: 5 }
  ];

  const dataAntrian = [
    { name: 'Senin', jumlah: 5 },
    { name: 'Selasa', jumlah: 6 },
    { name: 'Rabu', jumlah: 4 },
    { name: 'Kamis', jumlah: 7 },
    { name: 'Jumat', jumlah: 3 }
  ];

  const dataKlasterPemeriksaan = [
    { name: 'Pemeriksaan 1', value: 30 },
    { name: 'Pemeriksaan 2', value: 50 },
    { name: 'Pemeriksaan 3', value: 20 }
  ];

  const dataBayiLahir = [
    { name: 'Januari', jumlah: 100 },
    { name: 'Februari', jumlah: 120 },
    { name: 'Maret', jumlah: 110 }
  ];

  const dataStatusPasien = [
    { name: 'Belum Periksa', value: 20 },
    { name: 'Menunggu', value: 15 },
    { name: 'Periksa', value: 40 },
    { name: 'Batal Periksa', value: 5 }
  ];
  
  const primaryColor = '#e064ac';  // Pink (sesuai warna buku pink)
  const secondaryColor = '#f1d0d6';  // Pink lembut
  const chartColor = '#FF2D8B'; // Pink pekat
  

  
  return (
    <div className="d-flex">
      {/* Sidebar - Dapat diperkecil dan diperbesar */}
      <Nav
        className="flex-column p-3"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: sidebarOpen ? '255px' : '80px', // Toggle sidebar
          boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.2)', // Menambahkan shadow
          backgroundColor: '#FFFFF',
          overflowY: 'auto',
          transition: 'width 0.3s', // Transisi halus saat memperkecil atau memperbesar
        }}
      >
        {/* Sidebar Header dengan Toggle Button */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            {/* Ikon Dashboard dan teks Dashboard */}
            {sidebarOpen && (
              <FaTachometerAlt size={28} style={{ color: primaryColor }} className="me-2" />
            )}
            <h4 className="fw-bold mb-0" style={{ color: primaryColor }}>
              {sidebarOpen ? 'Dashboard' : ''}
            </h4>
          </div>
          <button
            className="btn btn-link"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ color: primaryColor, fontSize: '20px' }}
          >
            <FaBars />
          </button>
        </div>
        {/* Menu Search */}
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
        {/* Menu Sidebar with Icons */}
        <Nav.Link
    onClick={() => setShowModal(true)} // Buka modal saat diklik
    className="fw-semibold mb-3 pb-3 border-bottom"
    style={{ color: primaryColor }}
>
    <FaUserPlus className="me-2" /> {sidebarOpen ? 'Pendaftaran Pasien' : ''}
</Nav.Link>
        <Nav.Link
          as={Link}
          to="/bidan/datapasien"
          className="fw-semibold mb-3 pb-3 border-bottom"
          style={{ color: primaryColor }}
        >
          <FaUsers className="me-2" /> {sidebarOpen ? 'Data Pasien' : ''} 
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/bidan/antrianpasien"
          className="fw-semibold mb-3 pb-3 border-bottom"
          style={{ color: primaryColor }}
        >
          <FaClock className="me-2" /> {sidebarOpen ? 'Antrian Pasien' : ''} 
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/bidan/pemeriksaan"
          className="fw-semibold mb-3 pb-3 border-bottom"
          style={{ color: primaryColor }}
        >
          <FaStethoscope className="me-2" /> {sidebarOpen ? 'Pemeriksaan' : ''} 
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/bidan/persalinan"
          className="fw-semibold mb-3 pb-3 border-bottom"
          style={{ color: primaryColor }}
        >
          <FaBaby className="me-2" /> {sidebarOpen ? 'Persalinan' : ''} 
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/bidan/pasca-persalinan"
          className="fw-semibold mb-3 pb-3 border-bottom"
          style={{ color: primaryColor }}
        >
          <FaBookMedical className="me-2" /> {sidebarOpen ? 'Pasca Persalinan' : ''} 
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/bidan/laporan-rekam-medis"
          className="fw-semibold mb-3 pb-3 border-bottom"
          style={{ color: primaryColor }}
        >
          <FaClipboardList className="me-2" /> {sidebarOpen ? 'Rekam Medis' : ''} 
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/bidan/imunisasi-bayi"
          className="fw-semibold mb-3 pb-3 border-bottom"
          style={{ color: primaryColor }}
        >
          <FaSyringe className="me-2" /> {sidebarOpen ? 'Imunisasi Bayi' : ''} 
        </Nav.Link>

        {/* Toggle Sidebar Button */}
        <div className="mt-auto"></div>
      </Nav>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-4"
        style={{
          backgroundColor: 'white',
          marginLeft: sidebarOpen ? '250px' : '80px',
          paddingBottom: '20px',
          height: '100vh',
          overflowY: 'scroll',
          transition: 'margin-left 0.3s',
        }}
      >
      <Navbar bg="white" className="mb-4 px-3 shadow-sm d-flex justify-content-between align-items-center rounded-3" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <FaBars className="d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)} />
      <Navbar.Brand className="fw-bold" style={{ color: primaryColor }}>Klik Bidan Desak</Navbar.Brand>
      <div className="d-flex align-items-center">
        <Dropdown align="end">
        <NavDropdown align="end" className="ms-4" title={<FaBell size={24} />} id="notifikasi-dropdown">
  <NavDropdown.Item href="#/action-1">Notifikasi 1: Pemberitahuan A</NavDropdown.Item>
  <NavDropdown.Item href="#/action-2">Notifikasi 2: Pemberitahuan B</NavDropdown.Item>
  <NavDropdown.Item href="#/action-3">Notifikasi 3: Pemberitahuan C</NavDropdown.Item>
</NavDropdown>
        </Dropdown>
        <NavDropdown title={<FaUserCircle size={25} />} id="profile-dropdown" align="end" menuVariant="light" className="dropdown-menu-end ms-3">
          <NavDropdown.Item as={Link} to="/bidan/profil">Ubah Profil</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
        </NavDropdown>
      </div>
    </Navbar>
        <Row>
          {/* Charts and Data */}
          <Col md={6} className="mb-4">
            <Card className="shadow p-4 border-0 bg-white rounded-4">
              <h5 className="fw-bold" style={{ color: primaryColor }}>Grafik Pasien per Hari</h5>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dataPasien}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="jumlah" stroke={chartColor} strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
          <Card className="shadow p-4 border-0 bg-white rounded-4">
  <h5 className="fw-bold" style={{ color: primaryColor }}>Distribusi Imunisasi</h5>
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie data={dataImunisasi} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill={chartColor} label>
        {dataImunisasi.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={['#ff7f50', '#f6c23e', '#e74a3b', '#1cc88a'][index % 4]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        layout="horizontal"
        verticalAlign="bottom"
        height={36}
        iconSize={20}
        formatter={(value, entry, index) => {
        return `${value}`;
        }}
        wrapperStyle={{
          marginBottom: '-20px',  // Jarak bawah dari legend
        }}
      />
    </PieChart>
  </ResponsiveContainer>
</Card>
</Col>
          <Col>
          <Card className="shadow p-4 border-0 bg-white rounded-4">
  <h5 className="fw-bold" style={{ color: primaryColor }}>Kalender Antrian Pasien</h5>
  <div className="d-flex flex-column" style={{ height: '100%' }}>
  <div className="flex-grow-1 overflow-auto" style={{ maxHeight: '250px', /*paddingRight: '0px' *scrollnya gajadi dikasi spasi)*/ }}>
      <KalenderAntrianPasien />
    </div>
  </div>
</Card>
</Col>
          <Col md={6} className="mb-4">
            <Card className="shadow p-4 border-0 bg-white rounded-4">
              <h5 className="fw-bold" style={{ color: primaryColor }}>Klasterisasi Jenis Pemeriksaan</h5>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={dataKlasterPemeriksaan} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill={chartColor} label>
                    {dataKlasterPemeriksaan.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#ff7f50', '#f6c23e', '#e74a3b'][index % 3]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
        layout="horizontal"
        verticalAlign="bottom"
        height={36}
        iconSize={20}
        formatter={(value, entry, index) => {
          return `${value}`;
        }}
        wrapperStyle={{
          marginBottom: '-20px',  // Jarak bawah dari legend
        }}
      />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card className="shadow p-4 border-0 bg-white rounded-4">
              <h5 className="fw-bold" style={{ color: primaryColor }}>Jumlah Bayi Lahir</h5>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dataBayiLahir}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="jumlah" stroke={chartColor} strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card className="shadow p-4 border-0 bg-white rounded-4">
              <h5 className="fw-bold" style={{ color: primaryColor }}>Status Pasien</h5>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={dataStatusPasien} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill={chartColor} label>
                    {dataStatusPasien.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#ff7f50', '#f6c23e', '#e74a3b', '#1cc88a'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
        layout="horizontal"
        verticalAlign="bottom"
        height={36}
        iconSize={20}
        formatter={(value, entry, index) => {
          return `${value}`;
        }}
        wrapperStyle={{
          marginBottom: '-20px', 
        }}
      />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
  <Modal.Header closeButton>
    <Modal.Title>Pendaftaran Pasien</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <PendaftaranolehBidan onClose={() => setShowModal(false)} />
      
  </Modal.Body>
</Modal>

    </div>
    
  );
};

export default DashboardBidan;

