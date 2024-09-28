import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    
    const handleSubmit = (e) => {
        e.preventDefault();

        // API
        // fetch
        
    };

    const goToHomePage = () => {
        navigate('/');
    };

    const goToRegisterPage = () => {
        navigate('/register');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Form onSubmit={handleSubmit} style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Iniciar Sesión</h2>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <div className="text-center">
                    <Button variant="primary" type="submit" className="w-100">
                        Iniciar Sesión
                    </Button>
                </div>

                <div className="text-center mt-3">
                    <Button variant="secondary" onClick={goToHomePage} className="w-100">
                        Volver a Home
                    </Button>
                </div>

                <div className="text-center mt-3">
                    <Button variant="outline-success" onClick={goToRegisterPage} className="w-100">
                        Regístrate
                    </Button>
                </div>

            </Form>
        </div>
    );
}

export default LoginPage;
