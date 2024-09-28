import { Link } from 'react-router-dom';

const HomePage = () => {


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <div>
                    <h1>Punto de Partido</h1>
                </div>

                <div className="d-flex justify-content-center mb-4">
                    
                    <Link to="/login">
                        <button className="btn btn-outline-secondary mx-2">Iniciar sesión</button>
                    </Link>
                    
                    <Link to="/register">
                        <button className="btn btn-outline-secondary mx-2">Regístrate</button>
                    </Link>
                    <button className="btn btn-outline-secondary mx-2">¿Eres un club?</button>
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
    );
};

export default HomePage;
