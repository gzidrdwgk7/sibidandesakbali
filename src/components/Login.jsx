// src/components/Login.jsx
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Login untuk akun bidan
        if (email === 'bidandesak@klikbidandesak.com' && password === 'bidan123') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userType', 'bidan');
            navigate('/dashboard-bidan');
        }
        // Login untuk pasien
        else if (email && password) {
            const storedEmail = localStorage.getItem('patientEmail');
            const storedPassword = localStorage.getItem('patientPassword');
            
            if (email === storedEmail && password === storedPassword) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userType', 'pasien');
                navigate('/dashboard-pasien');
            } else {
                setError('Email atau password salah!');
            }
        } else {
            setError('Silakan masukkan email dan password yang valid.');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Masukkan email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Masukkan password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                {error && <p className="text-danger">{error}</p>}

                <Button variant="primary" type="submit">
                    Masuk
                </Button>
            </Form>
            <p>
                Belum punya akun sebagai Pasien? <Link to="/register">Daftar di sini</Link>
            </p>
        </Container>
    );
};

export default Login;
