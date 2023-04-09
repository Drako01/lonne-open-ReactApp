import carrito from '../assets/icons/carro.png';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';

const CartWidget = () => {

    const { totalQuantity } = useCart()
    const location = useLocation();
    
    return (
        <li>
            {
                (location.pathname === '/history' || location.pathname === '/contact') ?
                    <Link to={'/cart'} className="delay09 CartWidget None">
                        <img src={carrito} className="App-icono Cart" alt="icono" /> <h4>{totalQuantity}</h4>
                    </Link>
                    :

                    <Link to={'/cart'} className="delay09 CartWidget">
                        <img src={carrito} className="App-icono Cart" alt="icono" /> <h4>{totalQuantity}</h4>
                    </Link>
            }
        </li>
    )
}

export default CartWidget;
