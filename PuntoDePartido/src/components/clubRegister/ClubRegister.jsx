import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Col, Row, Navbar, Nav, Container, Card } from 'react-bootstrap';

function ClubRegister() {
    const navigate = useNavigate();

    const [clubName, setClubName] = useState('');
    const [email, setEmail] = useState('');
    const [cvu, setCvu] = useState('');
    const [numberOfCourts, setNumberOfCourts] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Number(numberOfCourts) <= 0) {
            alert("La cantidad de canchas debe ser mayor a 0.");
            return;
        }

        const clubInfo = {
            Nombre: clubName,
            Descripcion: description,
            CVU: cvu,
            Email: email,
            NumeroDeCanchas: Number(numberOfCourts),
        };

        try {
            const response = await fetch('https://localhost:7019/api/Club', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clubInfo),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Error al registrar el club: ${errorData}`);
            }

            const data = await response.json();
            alert("Club registrado exitosamente.");
            navigate(`/owner/${data.id}`);
        } catch (error) {
            console.error('Error:', error);
            alert('Error al registrar el club');
        }
    };

    const goToHomePage = () => {
        navigate('/');
    };

    return (
        <>
            {/* Navbar con tema oscuro */}
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

            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#000' }}>
                <Container>
                    <Card className="mx-auto shadow" style={{ maxWidth: '600px', backgroundColor: '#1a1a1a' }}>
                        <Card.Body>
                            <Card.Title className="text-center text-white mb-4">Registro de Club</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formClubName">
                                    <Form.Label className="text-white">Nombre del Club</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingresa el nombre del club"
                                        value={clubName}
                                        onChange={(e) => setClubName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label className="text-white">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Ingresa tu correo electrónico"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formCVU">
                                    <Form.Label className="text-white">CVU</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingresa tu CVU"
                                        value={cvu}
                                        onChange={(e) => setCvu(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formNumberOfCourts">
                                        <Form.Label className="text-white">Número de Canchas</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingresa el número de canchas"
                                            value={numberOfCourts}
                                            onChange={(e) => setNumberOfCourts(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label className="text-white">Descripción</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Describe tu club"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100 mb-3">
                                    Registrarse
                                </Button>

                                <Button variant="secondary" className="w-100" onClick={goToHomePage}>
                                    Volver a Inicio
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </>
    );
}

export default ClubRegister;
