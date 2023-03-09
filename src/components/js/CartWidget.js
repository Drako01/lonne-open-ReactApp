import carrito from '../assets/icons/carro.png';

const CartWidget = (props) => {

    return (
        <li>
            <img src={carrito} onClick={props.callback} className="App-icono Cart" alt="icono" /> {props.click}
        </li>
    )
}

export default CartWidget;
