import { Link } from 'react-router-dom';
import donald from '../assets/icons/donald.gif'

const Checkout = () =>{
    return (
        <section>
            <h1 className='Mini'>
                Usted ha Pagado.!
            </h1>
            <img src={donald} alt='Donald' />
            <div className='ComprarFinal'>
                <Link to={'/'} >Volver</Link>
            </div>
        </section>
    )
}

export default Checkout