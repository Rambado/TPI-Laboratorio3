import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import LoginPage from './components/loginPage/LoginPage';
import RegisterUser from './components/registerUser/RegisterUser'
import ClubRegister from './components/clubRegister/ClubRegister';
import ReserverPage from './components/reserver/ReserverPage';
import ProfilePage from './components/profilePage/ProfilePage';
import OwnerPage from './components/ownerPage/OwnerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/club-register" element={<ClubRegister />} />
        <Route path="/reserva" element={<ReserverPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/owner/:id" element={<OwnerPage />} />
      </Routes>
    </Router>
  );
}

export default App;

