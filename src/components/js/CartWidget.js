import carrito from '../assets/icons/carro.png';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
    
    const { totalQuantity } = useCart()
    
    return (
        <li>
            <Link to={'/cart'} className="delay09 CartWidget">
                <img src={carrito} className="App-icono Cart" alt="icono" /> <h4>Carrito {totalQuantity}</h4>
            </Link>
            
        </li>
    )
}

export default CartWidget;
