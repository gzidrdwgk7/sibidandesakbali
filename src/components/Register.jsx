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

    useEffect(() => {
        // Set background image when register page is rendered
        document.body.style.backgroundImage = 'url("/img/bg.jpg")';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';

        // Cleanup the background on component unmount
        return () => {
            document.body.style.backgroundImage = ''; // Reset background on unmount
        };
    }, []);

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
        <Container className="vh-100 d-flex justify-content-center align-items-center">
            <Row className="w-100">
                <Col xs={12} md={4} className="register-card mx-auto">
                    <div className="card shadow-sm rounded p-4 text-start">
                        <Image
                            src="/img/bidandelima.png"
                            alt="Logo"
                            className="logo img-fluid mb-3 mx-auto d-block"
                            style={{ width: '60px', height: 'auto' }}
                        />
                        <h2 className="text-center mb-4">Daftar Dulu Yuk Mom!</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFirstName">
                                <Form.Label className="text-start d-block">Nama Depan</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan nama depan"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formLastName">
                                <Form.Label className="text-start d-block">Nama Belakang</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan nama belakang"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail">
                                <Form.Label className="text-start d-block">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Masukkan email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label className="text-start d-block">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Masukkan password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 mt-3">
                                Daftar Akun
                            </Button>
                        </Form>
                        <p className="text-center mt-3">
                            Sudah Punya Akun? <Link to="/">Login di Sini</Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
