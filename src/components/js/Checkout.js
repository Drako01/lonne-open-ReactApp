import { Link } from 'react-router-dom';
import donald from '../assets/icons/donald.gif'

const Checkout = () => {
    return (
        <div className='Checkout'>
            <h1>
                Checkout
            </h1>
            <img src={donald} alt='Donald' />
            <div className='ComprarFinal'>
                <Link to={'../payment'} >Finalizar Compra</Link>
            </div>

        </div>
    )
}

export default Checkout