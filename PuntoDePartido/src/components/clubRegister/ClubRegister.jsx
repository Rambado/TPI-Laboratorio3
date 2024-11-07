import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Col, Row, Navbar, Nav, Container } from 'react-bootstrap';

function ClubRegister() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [clubName, setClubName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [cvu, setCvu] = useState('');
    const [numberOfCourts, setNumberOfCourts] = useState('');
    const [description, setDescription] = useState('');
    //const [images, setImages] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const clubInfo = {
            username,
            clubName,
            password,
            email,
            cvu,
            numberOfCourts,
            description,
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
                throw new Error('Error al registrar el club');
            }
    
            const data = await response.json();
            console.log('Club registrado:', data);
            goToHomePage();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // const handleImageChange = (e) => {
    //     setImages(e.target.files);
    // };

    const goToHomePage = () => {
        navigate('/');
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
                    </Nav>
                </Container>
            </Navbar>

            <div className="d-flex justify-content-center align-items-center vh-100">
                <Form onSubmit={handleSubmit} style={{ width: '600px' }}>
                    <h2 className="text-center mb-4">Registro de Club</h2>

                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa tu nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formClubName">
                        <Form.Label>Nombre del Club</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa el nombre del club"
                            value={clubName}
                            onChange={(e) => setClubName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCVU">
                        <Form.Label>CVU</Form.Label>
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
                            <Form.Label>Número de Canchas</Form.Label>
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
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Describe tu club"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formImages">
                        <Form.Label>Subir Imágenes</Form.Label>
                        <Form.Control
                            type="file"
                            name="images"
                            //onChange={handleImageChange}
                            multiple
                            accept="image/*"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mb-3">
                        Registrarse
                    </Button>

                    <Button variant="secondary" className="w-100" onClick={goToHomePage}>
                        Volver a Inicio
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default ClubRegister;
