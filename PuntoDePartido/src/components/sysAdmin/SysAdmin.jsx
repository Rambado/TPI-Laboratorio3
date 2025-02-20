import { useState } from 'react';
import { Tabs, Tab, Button, Table, Form, Navbar, Nav, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
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
            setUsuarios(usuarios.map(usuario =>
                usuario.id === selectedUser.id ? selectedUser : usuario
            ));
        } else {
            const newUser = { ...selectedUser, id: usuarios.length + 1 };
            setUsuarios([...usuarios, newUser]);
        }
        setSelectedUser(null);
        setIsEditing(false);
    };

    const eliminarUsuario = (id) => {
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
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
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt=""
                            src="/img/PdP.png"
                            width="40"
                            height="40"
                            className="d-inline-block align-center me-2"
                        />
                        Punto de Partido
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <div className="py-4" style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
                <Container>
                    <Card className="p-3 shadow mb-4" style={{ backgroundColor: '#1a1a1a' }}>
                        <Tabs
                            defaultActiveKey="usuarios"
                            className="mb-3"
                            fill
                            variant="pills"
                        >
                            <Tab eventKey="usuarios" title="Usuarios">
                                <Card body className="mb-3" style={{ backgroundColor: '#2a2a2a' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="mb-0 text-white">Gestión de Usuarios</h5>
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                setSelectedUser({ nombre: '', email: '', tel: '' });
                                                setIsEditing(false);
                                            }}
                                        >
                                            Crear Usuario
                                        </Button>
                                    </div>

                                    {selectedUser && (
                                        <Form onSubmit={handleSubmit} className="mb-3">
                                            <h6 className='text-white'>{isEditing ? "Editar Usuario" : "Crear Usuario"}</h6>
                                            <Form.Group className="mb-3">
                                                <Form.Label className='text-white'>Nombre</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={selectedUser.nombre}
                                                    onChange={(e) =>
                                                        setSelectedUser({ ...selectedUser, nombre: e.target.value })
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className='text-white'>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    value={selectedUser.email}
                                                    onChange={(e) =>
                                                        setSelectedUser({ ...selectedUser, email: e.target.value })
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className='text-white'>Teléfono</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    value={selectedUser.tel}
                                                    onChange={(e) =>
                                                        setSelectedUser({ ...selectedUser, tel: e.target.value })
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                            <Button variant="success" type="submit" className='text-white'>
                                                {isEditing ? "Guardar Cambios" : "Crear Usuario"}
                                            </Button>
                                        </Form>
                                    )}

                                    <Table striped bordered hover variant="dark" className="mt-3">
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
                                                            className="me-2"
                                                            onClick={() => {
                                                                setSelectedUser(usuario);
                                                                setIsEditing(true);
                                                            }}
                                                        >
                                                            Editar
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => eliminarUsuario(usuario.id)}
                                                        >
                                                            Eliminar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card>
                            </Tab>

                            <Tab eventKey="reservas" title="Reservas">
                                <Card body style={{ backgroundColor: '#2a2a2a' }}>
                                    <h5 className="mb-3 text-white">Gestión de Reservas</h5>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='text-white'>Selecciona un Club</Form.Label>
                                        <Form.Select
                                            value={selectedClub}
                                            onChange={(e) => setSelectedClub(e.target.value)}
                                        >
                                            <option value="">Selecciona un club</option>
                                            <option value="Utopia">Utopia</option>
                                            <option value="Rosario Padel">Rosario Padel</option>
                                        </Form.Select>
                                    </Form.Group>

                                    {selectedClub && (
                                        <>
                                            <h6 className='text-white'>Turnos para {selectedClub}</h6>
                                            <Table striped bordered hover variant="dark" className="mt-3">
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
                                                        const ocupada = reservasOcupadas[selectedClub].find(
                                                            (reserva) => reserva.Horario === turno.Horario
                                                        );
                                                        return (
                                                            <tr key={index}>
                                                                <td>{turno.BloqueReserva}</td>
                                                                <td>{turno.Horario}</td>
                                                                <td>
                                                                    {ocupada ? (
                                                                        `Ocupado por: ${ocupada.Usuario}`
                                                                    ) : (
                                                                        <Button
                                                                            variant="success"
                                                                            onClick={() => reservarTurno(selectedClub, turno.Horario)}
                                                                        >
                                                                            Reservar
                                                                        </Button>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {ocupada && (
                                                                        <Button
                                                                            variant="danger"
                                                                            onClick={() => eliminarReserva(selectedClub, turno.Horario)}
                                                                        >
                                                                            Eliminar Reserva
                                                                        </Button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                        </>
                                    )}
                                </Card>
                            </Tab>
                        </Tabs>
                    </Card>
                </Container>
            </div>
        </>
    );
};

export default AdminPage;
