import carrito from '../assets/icons/carro.png';

const CartWidget = () => {

    return (
        <li>
            <img src={carrito} className="App-icono Cart" alt="icono" /> 0
        </li>
    )
}

export default CartWidget;
