import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Navbar, Nav, Container, Card } from 'react-bootstrap';
import axios from 'axios';

function LoginPage() {
    const [dni, setDni] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7020/api/Auth/login', {
                dni,
                contrasena
            });

            const { token, rol, usuarioId, nombre, expiration } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', usuarioId);
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('rol', rol);
            localStorage.setItem('tokenExpiration', expiration);

            if (rol === 'Jugador') {
                navigate('/reserva');
            } else if (rol === 'Owner') {
                navigate('/owner');
            } else if (rol === 'Administrador') {
                navigate('/sysAdmin');
            } else {
                alert('Rol no reconocido');
            }
        } catch (error) {
            console.error("Error:", error);
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
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to='/'>
                        <img
                            alt=""
                            src="/img/PdP.png"
                            width="40"
                            height="40"
                            className="d-inline-block align-center me-2"
                        />
                        Punto de Partido
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to='/'>Inicio</Nav.Link>
                        <Nav.Link as={Link} to='/reserva'>Reservas</Nav.Link>
                        <Nav.Link as={Link} to='/perfil'>Perfil</Nav.Link>
                        <Nav.Link as={Link} to='/owner'>Perfil Club</Nav.Link>
                        <Nav.Link as={Link} to='/sysAdmin'>Administrador</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <div className="d-flex justify-content-center align-items-center vh-100 bg-black">
                <Card style={{ width: '400px' }} className="p-4 text-center shadow">
                    <Card.Title as="h2" className="mb-4">Iniciar Sesión</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="dni">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese su DNI"
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="contrasena">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingrese su contraseña"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" className="w-100">
                            Iniciar Sesión
                        </Button>

                        <Button
                            variant="outline-success"
                            onClick={goToRegisterPage}
                            className="w-100 mt-3"
                        >
                            Regístrate
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={goToHomePage}
                            className="w-100 mt-3"
                        >
                            Volver a Inicio
                        </Button>
                    </Form>
                </Card>
            </div>
        </>
    );
}

export default LoginPage;
