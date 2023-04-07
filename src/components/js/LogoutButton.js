import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import logoutImg from '../assets/icons/logout.png';

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <li>            
            <Link onClick={handleLogout} className="CartWidget">
                <h4 className='NoMargin'>Logout</h4>
                <img src={logoutImg} className="App-icono Cart Login" alt="icono" /> 
            </Link>
        </li>
    );
};

export default LogoutButton;
