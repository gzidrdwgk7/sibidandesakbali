// src/components/Register.jsx
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    // Validasi email menggunakan regex
    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Cek validitas email
        if (!validateEmail(email)) {
            setEmailError('Email tidak valid. Harus mengandung "@domain.com"');
            return;
        }

        setEmailError(''); // Reset error jika email valid

        if (firstName && lastName && email && password) {
            // Simpan data pasien di localStorage
            localStorage.setItem('patientEmail', email);
            localStorage.setItem('patientPassword', password);
            alert('Pendaftaran berhasil sebagai pasien!');
            navigate('/'); // Arahkan ke halaman login setelah pendaftaran
        } else {
            alert('Silakan lengkapi semua field.');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Daftar</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName">
                    <Form.Label>Nama Depan</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Masukkan nama depan"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formLastName">
                    <Form.Label>Nama Belakang</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Masukkan nama belakang"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Masukkan password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Daftar
                </Button>
            </Form>
        </Container>
    );
};

export default Register;
