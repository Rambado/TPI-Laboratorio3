import { Container, Navbar, Nav, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function OwnerPage() {

    const clubData = {
        clubName: "Club Rosario",
        description: "El mejor club de paddle en Rosario.",
        numberOfCourts: 4,
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
                        <Nav.Link as={Link} to='/perfil'>Perfil</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-5" style={{ width: '800px' }}>
                <Card>
                    <Card.Header as="h5">Perfil del Club</Card.Header>
                    <Card.Body>
                        <Card.Title>{clubData.clubName}</Card.Title>
                        <Card.Text>
                            <strong>Descripción:</strong> {clubData.description} <br/>
                            <strong>Número de canchas:</strong> {clubData.numberOfCourts}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="mt-4">
                    <Card.Header as="h5">Editar Información del Club</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formClubName">
                                <Form.Label>Nombre del Club</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el nombre del club" defaultValue={clubData.clubName} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as="textarea" placeholder="Descripción del club" defaultValue={clubData.description} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formNumberOfCourts">
                                <Form.Label>Número de Canchas</Form.Label>
                                <Form.Control type="number" placeholder="Cantidad de canchas" defaultValue={clubData.numberOfCourts} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Guardar Cambios
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
//lista con las proximas reservas, archivo de reservas aneriores
//que el dueño pueda marcar una cancha como no disponible
//que pueda bloquear un día por algún evento(torneo)

export default OwnerPage;
