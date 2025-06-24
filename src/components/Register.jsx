import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
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

    // Efek mengetik, hanya dijalankan jika lebar layar lebih besar dari 768px
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

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('Email tidak valid. Harus mengandung "@domain.com"');
            return;
        }

        setEmailError('');

        if (firstName && lastName && email && password) {
            // Simulate saving registration data
            localStorage.setItem('patientEmail', email);
            localStorage.setItem('patientPassword', password);
            alert('Pendaftaran berhasil sebagai pasien!');
            navigate('/'); // Redirect to login page
        } else {
            alert('Silakan lengkapi semua field.');
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
                            src="public/img/bidan-vector.png"
                            alt="Bidan"
                            fluid
                            style={{ maxHeight: '400px' }}
                        />
                        <h5 className="mt-3" style={{ color: primaryColor }}>
                            Selalu Siap Mendampingi Ibu dan Bayi
                        </h5>
                    </div>
                </Col>

                {/* Kanan: Form Register */}
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
                            <Form.Group controlId="formFirstName" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan nama depan"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="rounded-pill py-2 px-3 border-0"
                                />
                            </Form.Group>

                            <Form.Group controlId="formLastName" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan nama belakang"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="rounded-pill py-2 px-3 border-0"
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Masukkan email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="rounded-pill py-2 px-3 border-0"
                                />
                                {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
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

                            <Button
                                variant="outline-light"
                                type="submit"
                                className="w-100 rounded-pill py-2"
                                style={{ backgroundColor: chartColor, border: 'none' }}
                            >
                                Daftar Akun
                            </Button>
                        </Form>

                        <p className="text-center mt-3">
                            Sudah Punya Akun?{' '}
                            <Link to="/" className="text-light fw-bold text-decoration-underline">
                                Login di Sini
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

                /* Nonaktifkan animasi pada layar kecil */
                @media (max-width: 768px) {
                    h2 {
                        animation: none; /* Nonaktifkan animasi mengetik */
                    }
                }
            `}</style>
        </Container>
    );
};

export default Register;
