import { Container, Navbar, Nav, Card, Button, Form } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function OwnerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [clubData, setClubData] = useState({
        clubName: "",
        description: "",
        numberOfCourts: 0,
        canchas: [] // Asegúrate de inicializar canchas como un array
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const config = { headers: { Authorization: `Bearer ${token}` } };

                const clubResponse = await axios.get(`https://localhost:7019/api/Club/${id}`, config);
                console.log('Respuesta de la API:', clubResponse.data);

                const clubData = clubResponse.data || {};
                setClubData({
                    clubName: clubData.nombre || '',
                    description: clubData.descripcion || '',
                    numberOfCourts: clubData.numeroDeCanchas || 0,
                    canchas: clubData.canchas || []
                });
            } catch (error) {
                console.error("Error al obtener los datos del club:", error);
                alert('Error al cargar los datos del club');
            } finally {
                setLoading(false);
            }
        };

        fetchClubData();
    }, [id, navigate]);

    const handleUpdateClub = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            await axios.put(`https://localhost:7019/api/Club/${id}`, {
                nombre: clubData.clubName,
                descripcion: clubData.description,
                numeroDeCanchas: clubData.numberOfCourts
            }, config);
            alert('Datos del club actualizados exitosamente');
        } catch (error) {
            console.error('Error al actualizar los datos del club:', error);
            alert('Error al actualizar los datos del club');
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

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
                            <strong>Descripción:</strong> {clubData.description} <br />
                            <strong>Número de canchas:</strong> {clubData.numberOfCourts}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="mt-4">
                    <Card.Header as="h5">Editar Información del Club</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleUpdateClub}>
                            <Form.Group className="mb-3" controlId="formClubName">
                                <Form.Label>Nombre del Club</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ingrese el nombre del club" 
                                    value={clubData.clubName} 
                                    onChange={(e) => setClubData({ ...clubData, clubName: e.target.value })} 
                                />
                            </Form.Group>

                            <Form.Group className="mb- 3" controlId="formDescription">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    placeholder="Ingrese una descripción del club" 
                                    value={clubData.description} 
                                    onChange={(e) => setClubData({ ...clubData, description: e.target.value })} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formNumberOfCourts">
                                <Form.Label>Número de Canchas</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Ingrese el número de canchas" 
                                    value={clubData.numberOfCourts} 
                                    onChange={(e) => setClubData({ ...clubData, numberOfCourts: e.target.value })} 
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Actualizar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default OwnerPage;