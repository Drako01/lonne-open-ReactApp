import whatsapp from '../assets/icons/whatsapp.svg';
import instagram from '../assets/icons/instagram.svg';
import facebook from '../assets/icons/facebook.svg';

const Footer = () => {
    return (
        <div className="Footer">
            <section className='Iconos-social'>
                <img src={whatsapp} alt="icono" />
                <img src={instagram} alt="icono" />
                <img src={facebook} alt="icono" />
            </section>
            <p>
                1er Entrega Parcial | Curso de React en CoderHouse | &copy; Alejandro Di Stefano | Comisión #39610
            </p>             
        </div>
    )
}

export default Footer;