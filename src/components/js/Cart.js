import { useCart } from '../../context/CartContext';
import close from '../assets/icons/close.png'
import { Link } from 'react-router-dom';

const Cart = () => {
    const { totalPrice, cart, removeItem } = useCart();

    const clickRemoveItem = (id) => {
        removeItem(id);
    }

    const cartItems = cart.map((p) => (
        <tr key={p.id}>            
            <td className='NombreProducto'>{p.name}</td>
            <td className='PriceProducto'>{`$${p.price}.-`}</td>
            <td>{p.quantity}</td>
            <td className='EliminarItem'>
                <button onClick={() => clickRemoveItem(p.id)}>
                    <img src={close} alt='Close' />
                </button>
            </td>
        </tr>
    ));

    return (
        <section className='CarroDeCompras'>
            <h1>Carro de Compras</h1>
            <table>
                <thead>
                    <tr>                        
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
