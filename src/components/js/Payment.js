import { Link } from 'react-router-dom';

const Payment = () =>{
    return (
        <section>
            <h1>
                Usted ha Pagado.!
            </h1>
            <div className='ComprarFinal'>
                <Link to={'/'} >Volver</Link>
            </div>
        </section>
    )
}

export default Payment