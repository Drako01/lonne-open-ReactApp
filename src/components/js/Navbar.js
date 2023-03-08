import icono from '../assets/icons/logo.ico';
import buscar from '../assets/icons/busqueda.png';
import mail from '../assets/icons/correo.png';
import carrito from '../assets/icons/carro.png';

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
                    <li><img src={carrito} className="App-icono" alt="icono" /></li>
                </ul>
                <button>Login</button> 
            </div>
        </nav>
    )
}

export default Navbar;