import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Navbar, Nav, Container } from 'react-bootstrap';
import axios from 'axios';

function LoginPage() {
    const [dni, setDni] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7019/api/Auth/login', {
                dni: dni,
                contrasena: contrasena,
            });

            const { token, rol, usuarioId, nombre, expiration } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', usuarioId);
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('rol', rol);
            localStorage.setItem('tokenExpiration', expiration);

            navigate(rol === 'Jugador' ? '/reserva' : '/owner');
        } catch (error) {
            if (error.response) {
                console.error("Error en la respuesta:", error.response.data);
            } else if (error.request) {
                console.error("Error en la solicitud:", error.request);
            } else {
                console.error("Error:", error.message);
            }
            alert('DNI o contraseña incorrectos');
        }
    };

    const goToHomePage = () => {
        navigate('/');
    };

    const goToRegisterPage = () => {
        navigate('/register');
    };

    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand as={Link} to='/'>
                        <img
                            alt=""
                            src="../../../img/PdP.png"
                            width="40"
                            height="40"
                            className="d-inline-block align-center" /> Punto de Partido
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link as={Link} to='/'>Inicio</Nav.Link>
                        <Nav.Link as={Link} to='/reserva'>Reservas</Nav.Link>
                        <Nav.Link as={Link} to='/perfil'>Perfil</Nav.Link>
                        <Nav.Link as={Link} to='/owner'>Perfil Club</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <div className="d-flex justify-content-center align-items-center vh-100">
                <Form onSubmit={handleSubmit} style={{ width: '400px' }}>
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese su DNI"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <div className="text-center">
                        <Button variant="primary" type="submit" className="w-100">
                            Iniciar Sesión
                        </Button>
                    </div>

                    <div className="text-center mt-3">
                        <Button variant="outline-success" onClick={goToRegisterPage} className="w-100">
                            Regístrate
                        </Button>
                    </div>

                    <div className="text-center mt-3">
                        <Button variant="secondary" onClick={goToHomePage} className="w-100">
                            Volver a Inicio
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default LoginPage;
