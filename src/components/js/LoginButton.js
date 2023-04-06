import { Link } from 'react-router-dom';
import login from '../assets/icons/login.png';


const LoginButton = () => {
    return (
        <li>
            <Link to={'/login'} className="CartWidget">
                <h4 className='NoMargin'>Login</h4><img src={login} className="App-icono Cart Login" alt="icono" /> 
            </Link>
            
        </li>
    )
}

export default LoginButton;
