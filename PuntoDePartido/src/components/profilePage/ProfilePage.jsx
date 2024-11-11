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
    //const [newPassword, setNewPassword] = useState('');
    //const [confirmPassword, setConfirmPassword] = useState('');
    // const [reservasAnteriores, setReservasAnteriores] = useState([]);

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

                const profileResponse = await axios.get(`https://localhost:7019/api/usuario/${userId}`, config);
                console.log('Respuesta de la API:', profileResponse.data);

                const profileData = profileResponse.data || {};
                setUserData(profileData);
                setNombre(profileData.nombre || '');
                setEmail(profileData.email || '');
                setTelefono(profileData.tel || '');
                setPosicion(profileData.posicionEnCancha || '');

                console.log('Respuesta de la API:', profileResponse.data);


                // const reservasResponse = await axios.get('https://localhost:7020/api/user/reservas', config);
                // setReservasAnteriores(reservasResponse.data || []);
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
            await axios.put(`http://localhost:7020/api/user/${userId}`, { nombre, email, telefono, posicion }, config);
            alert('Perfil actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            alert('Error al actualizar perfil');
        }
    };

    const obtenerPosicionJuego = (posicion) => {
        switch (posicion) {
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

    // const handlePasswordChange = async (e) => {
    //     e.preventDefault();
    //     if (newPassword !== confirmPassword) {
    //         alert('Las contraseñas no coinciden');
    //         return;
    //     }
    //     try {
    //         const token = localStorage.getItem('token');
    //         const config = { headers: { Authorization: `Bearer ${token}` } };
    //         await axios.post('http://localhost:7020/api/user/change-password', { newPassword }, config);
    //         alert('Contraseña cambiada exitosamente');
    //     } catch (error) {
    //         console.error('Error al cambiar contraseña:', error);
    //         alert('Error al cambiar contraseña');
    //     }
    // };

    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand as={Link} to='/'>
                        <img
                            alt="Punto de Partido Logo"
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
                        {/* <Card className="mt-4">
                            <Card.Header as="h5">Reservas Anteriores</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    {reservasAnteriores.map((reserva) => (
                                        <ListGroup.Item key={reserva.id}>
                                            <strong>Fecha:</strong> {reserva.fecha} <br />
                                            <strong>Club:</strong> {reserva.club} <br />
                                            <strong>Turno:</strong> {reserva.turno} <br />
                                            <strong>Cancha:</strong> {reserva.cancha}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card> */}
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

                        {/* <Card>
                            <Card.Header as="h5">Cambiar Contraseña</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handlePasswordChange}>
                                    <Form.Group className="mb-3" controlId="formPasswordNueva">
                                        <Form.Label>Nueva Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Ingrese nueva contraseña"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPasswordConfirmar">
                                        <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirme nueva contraseña"
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Cambiar Contraseña
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card> */}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ProfilePage;
