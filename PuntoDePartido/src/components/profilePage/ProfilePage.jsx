import { Container, Navbar, Nav, Card, Button, Form, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProfilePage() {

    const userData = {
        nombre: "Matias Rambado",
        email: "matias@mail.com",
        telefono: "123456789",
        posicion: "Drive",
    };

    const reservasAnteriores = [
        { id: 1, fecha: '2024-10-01', club: 'Utopia', turno: 'Mañana', cancha: 'Cancha 1' },
        { id: 2, fecha: '2024-09-25', club: 'Utopia', turno: 'Tarde', cancha: 'Cancha 2' },
        { id: 3, fecha: '2024-09-18', club: 'Utopia', turno: 'Noche', cancha: 'Cancha 3' },
    ];

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
                                <Card.Title>{userData.nombre}</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {userData.email} <br />
                                    <strong>Teléfono:</strong> {userData.telefono} <br />
                                    <strong>Posición en cancha:</strong> {userData.posicion}
                                </Card.Text>
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
                                <Form>
                                    <Form.Group className="mb-3" controlId="formNombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese su nombre" defaultValue={userData.nombre} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Ingrese su email" defaultValue={userData.email} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formTelefono">
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese su teléfono" defaultValue={userData.telefono} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPosicion">
                                        <Form.Label>Posición en Cancha</Form.Label>
                                        <Form.Select defaultValue={userData.posicion}>
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
                                <Form>
                                    <Form.Group className="mb-3" controlId="formPasswordNueva">
                                        <Form.Label>Nueva Contraseña</Form.Label>
                                        <Form.Control type="password" placeholder="Ingrese su nueva contraseña" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPasswordConfirmar">
                                        <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                                        <Form.Control type="password" placeholder="Confirme su nueva contraseña" />
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
