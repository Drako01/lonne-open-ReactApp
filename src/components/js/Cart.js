import { useCart } from '../../context/CartContext';
import close from '../assets/icons/close.png'
import { Link } from 'react-router-dom';

const Cart = () => {
    const { totalPrice, cart, removeItem } = useCart();

    const handleRemoveItem = (id) => {
        removeItem(id);
    }

    const cartItems = cart.map((p) => (
        <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{`$${p.price}.-`}</td>
            <td>{p.quantity}</td>
            <td className='EliminarItem'>
                <button onClick={() => handleRemoveItem(p.id)}>
                    <img src={close} alt='Close' />
                </button>
            </td>
        </tr>
    ));

    return (
        <section>
            <h1>Carro de Compras</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>{cartItems}</tbody>
            </table>

            <h3 className='PrecioTotal'>{`Total: $${totalPrice}.-`}</h3>
            <div className='ComprarFinal'>
                <Link to='../checkout'>Comprar</Link>
            </div>
        </section>
    );
};

export default Cart;
