import {useState} from 'react'
import { Form, Button } from 'react-bootstrap';

function OwnerPage() {

    const [selectedClub, setSelectedClub] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);

    const clubes = ['Utopia', 'Rosario Padel'];
    const cupos = {
        'Utopia': {Lunes:{Mañana:4, Tarde:4, Noche:4}},
        'Rosario Padel': {Lunes:{Mañana:4, Tarde:4, Noche:4}}
};


  return (

    <div className="d-flex justify-content-center align-items-center vh-100">
            <Form style={{ width: '400px' }}>
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
                        <option value="mañana">Mañana</option>
                        <option value="tarde">Tarde</option>
                        <option value="noche">Noche</option>
                    </Form.Control>
                </Form.Group>

                
                <Button variant="primary" type="submit" className="w-100 mb-3">
                    Ver cupos disponibles
                </Button>

                
                {availableSlots !== null && (
                    <div className="text-center">
                        <h5>Cupos disponibles: {setAvailableSlots}</h5>
                    </div>
                )}
            </Form>
        </div>
  )
}

export default OwnerPage

