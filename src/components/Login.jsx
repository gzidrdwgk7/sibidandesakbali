import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Set background image when login page is rendered
        document.body.style.backgroundImage = 'url("/img/bg.jpg")';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';

        // Cleanup the background on component unmount
        return () => {
            document.body.style.backgroundImage = '';
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === 'bidan@klikbidandesak.com' && password === 'bidan123') {
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/dashboard-bidan');
        } else {
            setError('Invalid email or password.');
        }
        const storedEmail = localStorage.getItem('patientEmail');
        const storedPassword = localStorage.getItem('patientPassword');

        if (email === storedEmail && password === storedPassword) {
            localStorage.setItem('isLoggedIn', 'true'); // Flag as logged in
            navigate('/dashboard-pasien'); // Navigate to DashboardPasien
        } else {
            setError('Email dan password salah atau tidak ada!'); // Show error if credentials are incorrect
        }
    };

    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center">
            <Row className="w-100">
                <Col xs={12} md={4} className="login-card mx-auto">
                    <div className="card shadow-sm rounded p-4 text-start">
                        <Image
                            src="/img/bidandelima.png"
                            alt="Logo"
                            className="logo img-fluid mb-3 mx-auto d-block"
                            style={{ width: '60px', height: 'auto' }}
                        />
                        <h2 className="text-center mb-4">Login Dulu Yuk Mom!</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-start d-block">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Tulis email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="text-start d-block">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Tulis password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            {error && <p className="text-danger">{error}</p>}

                            <Button variant="primary" type="submit" className="w-100 mt-3">
                                Login
                            </Button>
                        </Form>
                        <p className="text-center mt-3">
                            Belum Punya Akun Pasien? <Link to="/register">Yuk Buat Akun!</Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
