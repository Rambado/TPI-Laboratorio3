import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const HomePage = () => {


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
                <div className="text-center">

                    <div className="mb-4 mt-n5">
                        <img
                            src="../../../img/f1.jpeg"
                            alt="padel"
                            className="img-fluid mb-3"
                            style={{ width: '1100px', maxHeight: '450px' }}
                        />
                        <h1>Punto de Partido</h1>
                    </div>

                    <div className="d-flex justify-content-center mb-4">

                        <Link to="/login">
                            <button className="btn btn-outline-light mx-2">Iniciar sesión</button>
                        </Link>

                        <Link to="/register">
                            <button className="btn btn-outline-secondary mx-2">Registrarse</button>
                        </Link>

                        <Link to="/club-register">
                            <button className="btn btn-outline-success mx-2">¿Eres un club?</button>
                        </Link>

                    </div>

                    <div>
                        <p>
                            Turnos disponibles para el día de la fecha
                        </p>
                    </div>

                    <div className="border" style={{ height: '200px' }}>
                        <p>Imágenes de canchas</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
