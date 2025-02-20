import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="Logo"
                            src="/img/PdP.png"
                            width="40"
                            height="40"
                            className="d-inline-block align-center me-2"
                        />
                        Punto de Partido
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                            <Nav.Link as={Link} to="/reserva">Reservas</Nav.Link>
                            <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="hero-section position-relative text-white">
                <img
                    src="/img/f1.jpeg"
                    alt="Padel"
                    className="hero-image"
                />
                <div className="hero-overlay" />
                <div className="hero-content text-center">
                    <h1 className="display-3 fw-bold">Punto de Partido</h1>
                    <p className="lead">Reserva tu turno de pádel ahora</p>
                    <div className="mt-4">
                        <Link to="/login" className="btn btn-primary me-2">
                            Iniciar sesión
                        </Link>
                        <Link to="/register" className="btn btn-secondary me-2">
                            Registrarse
                        </Link>
                        <Link to="/club-register" className="btn btn-success">
                            ¿Eres un club?
                        </Link>
                    </div>
                </div>
            </div>

            <Container className="my-5 text-center">
                <h2>Turnos disponibles para el día de la fecha</h2>
                <div className="border mt-4" style={{ height: '200px' }}>
                    <p className="mt-5">Imágenes de canchas (próximamente)</p>
                </div>
            </Container>
        </>
    );
};

export default HomePage;
