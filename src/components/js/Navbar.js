import icono from '../assets/icons/logo.ico';
import buscar from '../assets/icons/busqueda.png';
import mail from '../assets/icons/correo.png';
import Button from './Button';
import Counter from './Counter';
import { Link, NavLink  } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav>
            <div className="Navbar">
                <Link to={`/`}><img src={icono} className="App-logo" alt="logo" /></Link>
                <ul>
                    <NavLink to='/category/Raqueta'  className={({ isActive }) => isActive ? 'Active' : 'Inactive'}><li>Raquetas</li></NavLink>
                    <NavLink to='/category/Tubos'  className={({ isActive }) => isActive ? 'Active' : 'Inactive'}><li>Tubos</li></NavLink>
                    <NavLink to='/category/Zapatillas'  className={({ isActive }) => isActive ? 'Active' : 'Inactive'}><li>Zapatillas</li></NavLink>
                    <NavLink to='/category/Remera'  className={({ isActive }) => isActive ? 'Active' : 'Inactive'}><li>Remeras</li></NavLink>
                    <NavLink to='/category/Muñequeras'  className={({ isActive }) => isActive ? 'Active' : 'Inactive'}><li>Muñequeras</li></NavLink>
                    <NavLink to='/category/Vincha'  className={({ isActive }) => isActive ? 'Active' : 'Inactive'}><li>Vinchas</li></NavLink>
                </ul>
                <ul>
                    <li><img src={buscar} className="App-icono" alt="icono" /></li>
                    <li><img src={mail} className="App-icono" alt="icono" /></li>
                    <Counter />
                </ul>
                <Button label='Login' />
            </div>
        </nav>
    )
}

export default Navbar;