import wa from '../assets/icons/whatsapp.svg';
import instg from '../assets/icons/instagram.svg';
import facebook from '../assets/icons/facebook.svg';


const Footer = () => {
    return (
        <div className="Footer">
            <section className='Iconos-social'>
                <img src={wa} alt="icono" />
                <img src={instg} alt="icono" />
                <img src={facebook} alt="icono" />
            </section>
            <p>
                &copy; | 1er Entrega Parcial | Curso de React en CoderHouse | Alejandro Di Stefano de la Comisión #39610
            </p>             
        </div>
    )
}

export default Footer;