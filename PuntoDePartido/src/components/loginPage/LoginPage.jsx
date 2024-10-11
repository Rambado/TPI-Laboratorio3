import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Navbar, Nav, Container } from 'react-bootstrap';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === 'usuario@mail.com' && password === '123456') {
            navigate('/reserva');
        } else {
            alert('Usuario o contraseña incorrectos');
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
                            className="d-inline-block align-center" />Punto de Partido</Navbar.Brand>
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
