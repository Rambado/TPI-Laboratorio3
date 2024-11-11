import { useState } from 'react';
import { Form, Button, ListGroup, Container, Navbar, Nav  } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ReserverPage() {
  const [selectedClub, setSelectedClub] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedTurnos, setSelectedTurnos] = useState([]);

  const clubes = ['Utopia', 'Rosario Padel'];


  const turnosPorHora = {
    Mañana: ['08:00 - 09:30', '09:30 - 11:00', '11:00 - 12:30'],
    Tarde: ['12:30 - 14:00', '14:00 - 15:30', '15:30 - 17:00'],
    Noche: ['17:00 - 18:30', '18:30 - 20:00', '20:00 - 21:30']
  };

  const cuposOcupados = {
    'Utopia': {
      Lunes: {
        Mañana: [false, true, false],
        Tarde: [true, false, true],
        Noche: [false, false, true]
      }
    },
    'Rosario Padel': {
      Lunes: {
        Mañana: [false, false, true],
        Tarde: [false, true, false],
        Noche: [true, true, false]
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const turnos = turnosPorHora[selectedTimeSlot] || [];
    const ocupados = cuposOcupados[selectedClub]?.[selectedDay]?.[selectedTimeSlot] || [];

    setSelectedTurnos(turnos.map((turno, index) => ({
      turno,
      ocupado: ocupados[index]
    })));
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
        <Form onSubmit={handleSubmit} style={{ width: '500px' }}>
          <h2 className="text-center mb-4">Reservar una Cancha</h2>

          <Form.Group className="mb-3">
            <Form.Label>Selecciona el club</Form.Label>
            <Form.Control
              as="select"
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              required
            >
              <option value="">Elige un club</option>
              {clubes.map((club) => (
                <option key={club} value={club}>
                  {club}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Selecciona el día</Form.Label>
            <Form.Control
              as="select"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              required
            >
              <option value="">Elige un día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Selecciona el turno</Form.Label>
            <Form.Control
              as="select"
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              required
            >
              <option value="">Elige un turno</option>
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
              <option value="Noche">Noche</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Ver cupos disponibles
          </Button>

          {selectedTurnos.length > 0 && (
            <ListGroup>
              {selectedTurnos.map(({ turno, ocupado }, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  variant={ocupado ? 'danger' : 'success'}>
                  {turno} - {ocupado ? 'Ocupado' : 'Disponible'}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Form>
      </div>
    </>
  );
}

export default ReserverPage;
