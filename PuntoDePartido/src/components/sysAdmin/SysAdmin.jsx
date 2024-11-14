import { useState } from 'react';
import { Tabs, Tab, Button, Table, Form, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const App = () => {
    const [selectedUser , setSelectedUser ] = useState(null);
    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: 'Matías Rambado', email: 'matias@gmail.com', tel: '123456789' },
        { id: 2, nombre: 'Nair García', email: 'nair@gmail.com', tel: '987654321' },
        { id: 3, nombre: 'Carlos Ramirez Diaz', email: 'carlos@gmail.com', tel: '999999999' },
    ]);

    const [isEditing, setIsEditing] = useState(false);
    const [selectedClub, setSelectedClub] = useState('');
    const [reservas, setReservas] = useState({
        'Utopia': [
            { BloqueReserva: "Mañana", Horario: "08:00 a 09:30", Cupo: 1, Disponible: true },
            { BloqueReserva: "Mañana", Horario: "09:30 a 11:00", Cupo: 2, Disponible: true },
            { BloqueReserva: "Mañana", Horario: "11:00 a 12:30", Cupo: 3, Disponible: true },
            { BloqueReserva: "Tarde", Horario: "12:30 a 14:00", Cupo: 1, Disponible: true },
            { BloqueReserva: "Tarde", Horario: "14:00 a 15:30", Cupo: 2, Disponible: true },
            { BloqueReserva: "Tarde", Horario: "15:30 a 17:00", Cupo: 3, Disponible: true },
            { BloqueReserva: "Noche", Horario: "17:00 a 18:30", Cupo: 1, Disponible: true },
            { BloqueReserva: "Noche", Horario: "18:30 a 20:00", Cupo: 2, Disponible: true },
            { BloqueReserva: "Noche", Horario: "20:00 a 21:30", Cupo: 3, Disponible: true },
        ],
        'Rosario Padel': [
            { BloqueReserva: "Mañana", Horario: "08:00 a 09:30", Cupo: 1, Disponible: true },
            { BloqueReserva: "Mañana", Horario: "09:30 a 11:00", Cupo: 2, Disponible: true },
            { BloqueReserva: "Tarde", Horario: "12:30 a 14:00", Cupo: 1, Disponible: true },
            { BloqueReserva: "Noche", Horario: "17:00 a 18:30", Cupo: 1, Disponible: true },
        ],
    });

    const [reservasOcupadas, setReservasOcupadas] = useState({
        'Utopia': [
            { Horario: "09:30 a 11:00", Usuario: "Matias Rambado" },
            { Horario: "14:00 a 15:30", Usuario: "Nair García" },
        ],
        'Rosario Padel': [
            { Horario: "08:00 a 09:30", Usuario: "Carlos Ramirez Diaz" },
        ],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setUsuarios(usuarios.map(usuario => usuario.id === selectedUser .id ? selectedUser  : usuario));
        } else {
            const newUser  = { ...selectedUser , id: usuarios.length + 1 };
            setUsuarios([...usuarios, newUser ]);
        }
        setSelectedUser (null);
        setIsEditing(false);
    };

    const eliminarUsuario = (id) => {
        setUsuarios(usuarios.filter(usuario => usuario .id !== id));
    };

    const eliminarReserva = (club, horario) => {
        setReservasOcupadas(prev => ({
            ...prev,
            [club]: prev[club].filter(reserva => reserva.Horario !== horario)
        }));
        setReservas(prev => ({
            ...prev,
            [club]: prev[club].map(turno => 
                turno.Horario === horario ? { ...turno, Disponible: true } : turno
            )
        }));
    };

    const reservarTurno = (club, horario) => {
        const usuario = prompt("Ingresa tu nombre para reservar el turno:");
        if (usuario) {
            setReservasOcupadas(prev => ({
                ...prev,
                [club]: [...prev[club], { Horario: horario, Usuario: usuario }]
            }));
            setReservas(prev => ({
                ...prev,
                [club]: prev[club].map(turno => 
                    turno.Horario === horario ? { ...turno, Disponible: false } : turno
                )
            }));
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
                        <Nav.Link as={Link} to='/perfil'>Perfil</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        <Tabs defaultActiveKey="usuarios" className="mb-3">
            <Tab eventKey="usuarios" title="Usuarios">
                <Button variant="primary" onClick={() => { setSelectedUser   ({ nombre: '', email: '', tel: '' }); setIsEditing(false); }}>
                    Crear Usuario
                </Button>

                {selectedUser    && (
                    <Form onSubmit={handleSubmit} className="mt-3">
                        <h5>{isEditing ? "Editar Usuario" : "Crear Usuario"}</h5>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedUser   .nombre}
                                onChange={(e) => setSelectedUser   ({ ...selectedUser   , nombre: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={selectedUser   .email}
                                onChange={(e) => setSelectedUser   ({ ...selectedUser   , email: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="tel"
                                value={selectedUser   .tel}
                                onChange={(e) => setSelectedUser   ({ ...selectedUser   , tel: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {isEditing ? "Guardar Cambios" : "Crear Usuario"}
                        </Button>
                    </Form>
                )}

                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.tel}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        onClick={() => {
                                            setSelectedUser   (usuario);
                                            setIsEditing(true);
                                        }}
                                    >
                                        Editar
                                    </Button>{" "}
                                    <Button variant="danger" onClick={() => eliminarUsuario(usuario.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Tab>
            <Tab eventKey="reservas" title="Reservas">
                <Form.Group className="mb-3">
                    <Form.Label>Selecciona un Club</Form.Label>
                    <Form.Control as="select" onChange={(e) => setSelectedClub(e.target.value)} value ={selectedClub}>
                        <option value="">Selecciona un club</option>
                        <option value="Utopia">Utopia</option>
                        <option value="Rosario Padel">Rosario Padel</option>
                    </Form.Control>
                </Form.Group>

                {selectedClub && (
                    <div>
                        <h5>Turnos para {selectedClub}</h5>
                        <Table striped bordered hover className="mt-3">
                            <thead>
                                <tr>
                                    <th>Bloque Reserva</th>
                                    <th>Horario</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservas[selectedClub].map((turno, index) => {
                                    const ocupada = reservasOcupadas[selectedClub].find(reserva => reserva.Horario === turno.Horario);
                                    return (
                                        <tr key={index}>
                                            <td>{turno.BloqueReserva}</td>
                                            <td>{turno.Horario}</td>
                                            <td>
                                                {ocupada ? 
                                                    `Ocupado por: ${ocupada.Usuario}` : 
                                                    <Button variant="success" onClick={() => reservarTurno(selectedClub, turno.Horario)}>Reservar</Button>
                                                }
                                            </td>
                                            <td>
                                                {ocupada && 
                                                    <Button variant="danger" onClick={() => eliminarReserva(selectedClub, turno.Horario)}>
                                                        Eliminar Reserva
                                                    </Button>
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Tab>
        </Tabs>
        </>
    );
};

export default App;