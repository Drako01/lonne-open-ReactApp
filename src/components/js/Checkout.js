import CreditCardForm from './CreditCard';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Checkout = () => {
    const { cart, totalPrice, clearCart, setPurchaseHistory } = useCart();
    const navigate = useNavigate();

    const vaciarCarrito = () => {
        clearCart();
    };

    const handlePayment = () => {
        Swal.fire({
            title: '¡Compra exitosa!',
            text: 'Gracias por comprar en Lonne Open',
            icon: 'success',
            didClose: () => {
                vaciarCarrito();
                navigate('/');
            }
        });
    };
    
    const handleOnClick = () => {
        const purchase = {
            date: new Date(),
            total: totalPrice,
            products: cart,
        };
        setPurchaseHistory((prevHistory) => [...prevHistory, purchase]);
        handlePayment();
    };

    return (
        <div>
            <h1 className="Mini">Checkout</h1>
            <div>
                <h3>Resumen de Compra</h3>
                <table className="ItemListDetail">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((product) => (
                            <tr key={product.id}>
                                <td className='LeftItem'>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.quantity}</td>
                                <td>${product.price * product.quantity}</td>
                            </tr>
                        ))}
                        <tr className="total-row">
                            <td className='PriceProducto' colSpan="3 ">Total:</td>
                            <td className='PriceProducto'>${totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="checkout-payment">
                <h3>Payment Details</h3>
                <CreditCardForm handlePayment={handlePayment} />
                <div className="ComprarFinal FinalButtons">
                    <button onClick={handleOnClick}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
