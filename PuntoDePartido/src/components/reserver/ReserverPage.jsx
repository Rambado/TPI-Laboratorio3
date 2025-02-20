import { useState } from 'react';
import { Form,Button,ListGroup,Container,Navbar,Nav,Card } from 'react-bootstrap';
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

    setSelectedTurnos(
      turnos.map((turno, index) => ({
        turno,
        ocupado: ocupados[index] || false
      }))
    );
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
            <Nav.Link as={Link} to="/reserva">Reservas</Nav.Link>
            <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="py-5" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
        <Container className="d-flex justify-content-center align-items-center">
          {/* Card que envuelve el formulario */}
          <Card className="p-4 shadow" style={{ backgroundColor: '#1a1a1a', width: '500px' }}>
            <Card.Title as="h2" className="text-center text-white mb-4">
              Reservar una Cancha
            </Card.Title>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Selecciona el club</Form.Label>
                <Form.Select
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
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-white">Selecciona el día</Form.Label>
                <Form.Select
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
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-white">Selecciona el turno</Form.Label>
                <Form.Select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  required
                >
                  <option value="">Elige un turno</option>
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noche">Noche</option>
                </Form.Select>
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 mb-3">
                Ver cupos disponibles
              </Button>
            </Form>

            {selectedTurnos.length > 0 && (
              <ListGroup>
                {selectedTurnos.map(({ turno, ocupado }, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    variant={ocupado ? 'danger' : 'success'}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>{turno}</span>
                    <span>{ocupado ? 'Ocupado' : 'Disponible'}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card>
        </Container>
      </div>
    </>
  );
}

export default ReserverPage;
