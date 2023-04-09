import { useCart } from '../../context/CartContext';
import close from '../assets/icons/close.png'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const Cart = () => {
    const { totalPrice, cart, removeItem, totalQuantity } = useCart();
    const navigate = useNavigate();
    const totalQuantityInCart = totalQuantity
    const { clearCart } = useCart();

    const clear = () => {
        Swal.fire({
            title: '¿Estás seguro de vaciar el carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--first)',
            cancelButtonColor: 'var(--brick)',
            confirmButtonText: 'Vaciar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                Swal.fire(
                    'Vacío',
                    'El carrito ha quedado vacío.!',
                    'success'
                )
            }
        })
    };


    const clickRemoveItem = (id) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar este producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--first)',
            cancelButtonColor: 'var(--brick)',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                removeItem(id);
                Swal.fire(
                    'Eliminado',
                    'El producto ha sido eliminado del carrito',
                    'success'
                )
            }
        })
    }

    const Comprar = () => {
        const handleOnClick = () => {
            navigate('/checkout');
        };
        const total = totalPrice;

        Swal.fire({
            title: 'Confirmar compra',
            html: `El valor total de tu compra es de $${total}.<br>¿Desea continuar?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--first)',
            cancelButtonColor: 'var(--brick)',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                return handleOnClick()
            }
        })
            .catch(error => {
                Swal.fire("Error", error.message, "error");
            });
    }


    const cartItems = cart.map((p) => (
        <tr key={p.id}>
            <td className='NombreProducto'>{p.name}</td>
            <td className='PriceProducto'>{`$${p.price}.-`}</td>
            <td>{p.quantity}</td>
            <td className='PriceProducto'>{`$${p.quantity * p.price}`}</td>
            <td className='EliminarItem'>
                <button onClick={() => clickRemoveItem(p.id)}>
                    <img src={close} alt='Close' />
                </button>
            </td>
        </tr>
    ));

    return (
        <section className='CarroDeCompras'>
            <h1 className='Mini'>Carro de Compras</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>{cartItems}</tbody>
            </table>
            {
                totalQuantityInCart < 1 ? (
                    <div className='CarritoVacio ComprarFinal'>
                        <h3>El Carrito esta Vacío.!</h3>
                        <Link to='/' className='CarroVacioBoton'>Volver</Link>
                    </div>

                ) : (
                    <div>
                        <h3 className='PrecioTotal'>{`Total: $${totalPrice}.-`}</h3>
                        <div className='ComprarFinal FinalButtons'>
                            <Link onClick={clear} className='VaciarCarrito'>Vaciar Carrito</Link>
                            <Link onClick={Comprar} >Comprar</Link>
                        </div>
                    </div>

                )
            }

        </section>
    );
};

export default Cart;
