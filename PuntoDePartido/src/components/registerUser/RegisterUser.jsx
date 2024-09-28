import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

function RegisterUser() {
    const [dni, setDni] = useState('');
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [posicionJuego, setPosicionJuego] = useState('Drive');
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

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDNI">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa tu DNI"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNombre">
                        <Form.Label>Nombre Completo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa tu nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEdad">
                        <Form.Label>Edad</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingresa tu edad"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridTelefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa tu teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPosicionJuego">
                        <Form.Label>Posición de Juego</Form.Label>
                        <Form.Select
                            value={posicionJuego}
                            onChange={(e) => setPosicionJuego(e.target.value)}
                            required
                        >
                            <option value="Drive">Drive</option>
                            <option value="Reves">Revés</option>
                            <option value="AmbosLados">Ambos lados</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingresa tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit" className="w-100 mb-3">
                    Registrarse
                </Button>

                <Button variant="secondary" className="w-100" onClick={goToHomePage}>
                    Volver a Home
                </Button>
            </Form>
        </div>
    );
}

export default RegisterUser;
