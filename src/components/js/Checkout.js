import { Link } from 'react-router-dom';
import donald from '../assets/icons/donald.gif'
import { useCart } from '../../context/CartContext'



const Checkout = () => {
    const { clearCart } = useCart();

    const clear = clearCart 
    return (
        <div className='Checkout'>
            <h1>
                Checkout
            </h1>
            <img src={donald} alt='Donald' />
            <div className='ComprarFinal'>
                <Link to={'../payment'} onClick={clear}>Finalizar Compra</Link>
            </div>

        </div>
    )
}

export default Checkout