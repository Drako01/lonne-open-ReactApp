import { Link } from 'react-router-dom';
import donald from '../assets/icons/donald.gif'

const Checkout = () => {
    return (
        <section className='Checkout'>
            <h1 className='Mini'>
                Compra finalizada con exito.!
            </h1>
            <img src={donald} alt='Donald' />
            <div className='ComprarFinal'>
                <Link to={'/'} className='VolverFinal'>Volver</Link>
            </div>
        </section>
    )
}

export default Checkout