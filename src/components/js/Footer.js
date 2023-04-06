import whatsapp from '../assets/icons/whatsapp.svg';
import instagram from '../assets/icons/instagram.svg';
import facebook from '../assets/icons/facebook.svg';
import WhatsAppButton from './WhatsAppButton';
import logo from '../assets/icons/logo.ico'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    const mensajeWhatsApp = () => {
        window.open("https://wa.me/5492257548207?text=Hola!%20Me%20gustaría%20tener%20información%20sobre%20los%20servicios%20que%20ofrecen.!")
    }
    const mensajeInstagram = () => {
        window.open("https://www.instagram.com/lonneopentenis/?hl=es")
    }
    const mensajeFacebook = () => {
        window.open("https://www.facebook.com/people/Lonn%C3%A9-Open-Tenis/100063638766614/?locale=es_LA")
    }

    return (
        <div className="Footer">
            <footer className='Top'>
                <img src={logo} alt='Lonne Open' />
                <section className='Links'>
                    <div>
                    <NavLink to='/'><li>Inicio</li></NavLink>
                    <NavLink to='/category/Raquetas' ><li>Raquetas</li></NavLink>
                    <NavLink to='/category/Tubos' ><li>Tubos</li></NavLink>
                    <NavLink to='/category/Zapatillas'><li>Zapatillas</li></NavLink>
                    </div>
                    <div>
                    <NavLink to='/category/Remeras' ><li>Remeras</li></NavLink>
                    <NavLink to='/category/Munequeras' ><li>Muñequeras</li></NavLink>
                    <NavLink to='/category/Vinchas' ><li>Vinchas</li></NavLink>
                    <NavLink to='/contact' ><li>Contactenos</li></NavLink>
                    </div>     
                </section>
            </footer>
            <footer className='Bottom'>
                <div className='Legal'>
                    <p>
                        &copy; Alejandro Di Stefano | Entrega Final | Curso de React en CoderHouse | Comisión #39610
                    </p>
                </div>
                <section className='Iconos-social Links'>
                    <img src={whatsapp} alt="icono" onClick={mensajeWhatsApp} />
                    <img src={instagram} alt="icono" onClick={mensajeInstagram} />
                    <img src={facebook} alt="icono" onClick={mensajeFacebook} />
                </section>
            </footer>
            <WhatsAppButton />
        </div>
    )
}

export default Footer;