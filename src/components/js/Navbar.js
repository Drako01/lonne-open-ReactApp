import icono from '../assets/icons/logo.ico';
import buscar from '../assets/icons/busqueda.png';
import mail from '../assets/icons/correo.png';
import Button from './Button';
import Counter from './Counter';

const Navbar = () => {
    return (
        <nav>
            <div className="Navbar">
                <a href='../'>
                    <img src={icono} className="App-logo" alt="logo" />
                </a>
                <ul>
                    <li>Deportes & Fitness</li>
                    <li>Ropa & Accesorios</li>
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