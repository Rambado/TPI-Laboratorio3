import { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Card, Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [posicion, setPosicion] = useState('');
    // Si en el API la posición es numérica (1, 2, 3) usaremos esos valores

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const config = { headers: { Authorization: `Bearer ${token}` } };

                // Unificamos el endpoint para GET y PUT (suponiendo que es el mismo)
                const profileResponse = await axios.get(`https://localhost:7019/api/usuario/${userId}`, config);
                console.log('Respuesta de la API:', profileResponse.data);

                const profileData = profileResponse.data || {};
                setUserData(profileData);
                setNombre(profileData.nombre || '');
                setEmail(profileData.email || '');
                setTelefono(profileData.tel || '');
                setPosicion(profileData.posicionEnCancha || '');
            } catch (error) {
                console.error('Error al cargar datos:', error);
                alert('Error al cargar datos');
            }
        };

        fetchData();
    }, [navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`https://localhost:7019/api/usuario/${userId}`, { nombre, email, telefono, posicion }, config);
            alert('Perfil actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            alert('Error al actualizar perfil');
        }
    };

    const obtenerPosicionJuego = (pos) => {
        switch (parseInt(pos)) {
            case 1:
                return 'Drive';
            case 2:
                return 'Revés';
            case 3:
                return 'Ambos lados';
            default:
                return '';
        }
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to='/'>
                        <img
                            alt="Punto de Partido Logo"
                            src="../../../img/PdP.png"
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
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-5" style={{ minHeight: '80vh' }}>
                <Row>
                    <Col md={4}>
                        <Card bg="dark" text="white" className="mb-4">
                            <Card.Header as="h5">Perfil del Jugador</Card.Header>
                            <Card.Body>
                                {userData ? (
                                    <>
                                        <Card.Title>{userData.nombre || ''}</Card.Title>
                                        <Card.Text>
                                            <strong>Email:</strong> {userData.email || ''} <br />
                                            <strong>Teléfono:</strong> {userData.tel || ''} <br />
                                            <strong>Posición en cancha:</strong> {obtenerPosicionJuego(userData.posicionEnCancha)}
                                        </Card.Text>
                                    </>
                                ) : (
                                    <p>Cargando datos...</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={8}>
                        <Card bg="dark" text="white" className="mb-4">
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
                                        <Form.Select
                                            value={posicion}
                                            onChange={(e) => setPosicion(parseInt(e.target.value))}
                                            required
                                        >
                                            <option value="">Selecciona una posición</option>
                                            <option value={1}>Drive</option>
                                            <option value={2}>Revés</option>
                                            <option value={3}>Ambos lados</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Guardar Cambios
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
