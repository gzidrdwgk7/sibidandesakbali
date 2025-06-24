import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [displayText, setDisplayText] = useState('');
  const [fullTexts] = useState(['Selamat Datang!', 'di Klik Bidan Desak!']);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const primaryColor = '#e064ac';
  const secondaryColor = '#f1d0d6';
  const chartColor = '#FF2D8B';

  useEffect(() => {
    document.body.style.backgroundColor = secondaryColor;
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  // Efek mengetik
  useEffect(() => {
    const typeText = () => {
      if (textIndex < fullTexts.length) {
        if (charIndex < fullTexts[textIndex].length) {
          const timeout = setTimeout(() => {
            setDisplayText((prev) => prev + fullTexts[textIndex][charIndex]);
            setCharIndex((prev) => prev + 1);
          }, 100);
          return () => clearTimeout(timeout);
        } else {
          const timeout = setTimeout(() => {
            setTextIndex((prev) => prev + 1);
            setCharIndex(0);
            setDisplayText('');
          }, 3000); // Jeda 3 detik
          return () => clearTimeout(timeout);
        }
      } else {
        setTextIndex(0); // Mengulang animasi
        setCharIndex(0);
        setDisplayText('');
      }
    };

    const timeout = setTimeout(typeText, 100); // Mulai typing setelah 100ms
    return () => clearTimeout(timeout);
  }, [charIndex, textIndex, fullTexts]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'bidan@klikbidandesak.com' && password === 'bidan123') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard-bidan');
      return;
    }

    const storedEmail = localStorage.getItem('patientEmail');
    const storedPassword = localStorage.getItem('patientPassword');

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard-pasien');
    } else {
      setError('Email dan password salah atau tidak ada!');
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center px-0">
      <Row className="w-100 h-100">
        {/* Kiri: Vektor Bidan */}
        <Col md={6} className="d-flex justify-content-center align-items-center bg-white p-4">
          <div
            style={{
              animation: 'float 4s ease-in-out infinite',
              textAlign: 'center'
            }}
          >
            <Image
              src="/img/bidan-vector.png"
              alt="Bidan"
              fluid
              style={{ maxHeight: '400px' }}
            />
            <h5 className="mt-3" style={{ color: primaryColor }}>
              Selalu Siap Mendampingi Ibu dan Bayi
            </h5>
          </div>
        </Col>

        {/* Kanan: Form Login */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center p-5"
          style={{ backgroundColor: primaryColor, color: 'white' }}
        >
          <div className="w-100" style={{ maxWidth: '400px', margin: '0 auto' }}>
            {/* Animasi Mengetik */}
            <h2 className="mb-4 text-center fw-bold" style={{ minHeight: '58px' }}>
              {displayText}
              <span style={{ fontWeight: 'normal' }}>|</span>
            </h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-pill py-2 px-3 border-0"
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-pill py-2 px-3 border-0"
                />
              </Form.Group>

              {error && <div className="text-warning small mb-3">{error}</div>}

              <div className="d-grid gap-2 mb-2">
                <Button
                  type="submit"
                  className="rounded-pill py-2"
                  style={{ backgroundColor: chartColor, border: 'none' }}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="outline-light"
                  className="rounded-pill py-2"
                >
                  Daftar Akun Pasien
                </Button>
              </div>
            </Form>

            <p className="text-center mt-3">
              Belum punya akun?{' '}
              <Link to="/register" className="text-light fw-bold text-decoration-underline">
                Yuk daftar sekarang!
              </Link>
            </p>
          </div>
        </Col>
      </Row>

      {/* Tambahkan animasi langsung di halaman */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </Container>
  );
};

export default Login;
