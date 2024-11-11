import { useState } from "react";
import { Form, Button, Col, Row, Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

function RegisterUser() {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [tel, setTel] = useState("");
  const [posicionEnCancha, setPosicionEnCancha] = useState(1);
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();


    const userInfo = {
      dni: dni,
      nombre: nombre,
      edad: Number(edad),
      tel: tel,
      email: email,
      contrasena: contrasena,
      rol: "Jugador",
      posicionEnCancha: parseInt(posicionEnCancha)
  };


    try {
      const response = await axios.post('https://localhost:7019/api/Usuario', userInfo);
      console.log('Usuario registrado:', response.data);
      alert('Usuario registrado exitosamente');
      navigate('/perfil');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario');
    }
  };


  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
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
        <Form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Registro de Usuario</h2>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridDNI">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridNombre">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEdad">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa tu edad"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu teléfono"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPosicionJuego">
              <Form.Label>Posición de Juego</Form.Label>
              <Form.Select
                value={posicionEnCancha}
                onChange={(e) => setPosicionEnCancha(e.target.value)}
                required
              >
                <option value={1}>Drive</option>
                <option value={2}>Revés</option>
                <option value={3}>Ambos lados</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Registrarse
          </Button>

          <Button variant="secondary" className="w-100" onClick={goToHomePage}>
            Volver a Incio
          </Button>
        </Form>
      </div>
    </>
  );

}
export default RegisterUser;
