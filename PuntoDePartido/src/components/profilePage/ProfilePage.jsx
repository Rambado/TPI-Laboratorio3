import { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Card, Button, Form, Row, Col, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [reservasAnteriores, setReservasAnteriores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [posicion, setPosicion] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login'); 
                    return;
                }

                const config = { headers: { Authorization: `Bearer ${token}` } };

                const profileResponse = await axios.get('http://localhost:5000/api/user/profile', config);
                setUserData(profileResponse.data);
                setNombre(profileResponse.data.nombre);
                setEmail(profileResponse.data.email);
                setTelefono(profileResponse.data.telefono);
                setPosicion(profileResponse.data.posicion);

                const reservasResponse = await axios.get('http://localhost:5000/api/user/reservas', config);
                setReservasAnteriores(reservasResponse.data);

            } catch {
                console.error('Error al cargar datos:');
            }
        };

        fetchData();
    }, [navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };


            await axios.put('localhost', { nombre, email, telefono, posicion }, config);
            alert('Perfil actualizado exitosamente');
        } catch {
            console.error('Error al actualizar perfil:');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const nuevaContraseña = e.target.formPasswordNueva.value;
            const confirmarContraseña = e.target.formPasswordConfirmar.value;

            if (nuevaContraseña !== confirmarContraseña) {
                alert('Las contraseñas no coinciden');
                return;
            }

            await axios.post('localhost', { nuevaContraseña }, config);
            alert('Contraseña cambiada exitosamente');
        } catch {
            console.error('Error al cambiar contraseña:');
        }
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
                            className="d-inline-block align-center"
                        />
                        Punto de Partido
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link as={Link} to='/'>Inicio</Nav.Link>
                        <Nav.Link as={Link} to='/reserva'>Reservas</Nav.Link>
                        <Nav.Link as={Link} to='/perfil'>Perfil</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-5">
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Header as="h5">Perfil del Jugador</Card.Header>
                            <Card.Body>
                                {userData ? (
                                    <>
                                        <Card.Title>{userData.nombre}</Card.Title>
                                        <Card.Text>
                                            <strong>Email:</strong> {userData.email} <br />
                                            <strong>Teléfono:</strong> {userData.telefono} <br />
                                            <strong>Posición en cancha:</strong> {userData.posicion}
                                        </Card.Text>
                                    </>
                                ) : (
                                    <p>Cargando datos...</p>
                                )}
                            </Card.Body>
                        </Card>
                        <Card className="mt-4">
                            <Card.Header as="h5">Reservas Anteriores</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    {reservasAnteriores.map((reserva) => (
                                        <ListGroup.Item key={reserva.id}>
                                            <strong>Fecha:</strong> {reserva.fecha} <br/>
                                            <strong>Club:</strong> {reserva.club} <br/>
                                            <strong>Turno:</strong> {reserva.turno} <br/>
                                            <strong>Cancha:</strong> {reserva.cancha}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={8}>
                        <Card className="mb-4">
                            <Card.Header as="h5">Editar Información del Perfil</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleUpdateProfile}>
                                    <Form.Group className="mb-3" controlId="formNombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formTelefono">
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPosicion">
                                        <Form.Label>Posición en Cancha</Form.Label>
                                        <Form.Select value={posicion} onChange={(e) => setPosicion(e.target.value)}>
                                            <option value="Drive">Drive</option>
                                            <option value="Revés">Revés</option>
                                            <option value="Ambas">Ambas</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Guardar Cambios
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Header as="h5">Cambiar Contraseña</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handlePasswordChange}>
                                    <Form.Group className="mb-3" controlId="formPasswordNueva">
                                        <Form.Label>Nueva Contraseña</Form.Label>
                                        <Form.Control type="password" placeholder="Ingrese nueva contraseña" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPasswordConfirmar">
                                        <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                                        <Form.Control type="password" placeholder="Confirme nueva contraseña" />
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Cambiar Contraseña
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ProfilePage;
