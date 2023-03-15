import whatsapp from '../assets/icons/whatsapp.svg';
import instagram from '../assets/icons/instagram.svg';
import facebook from '../assets/icons/facebook.svg';
import WhatsAppButton from './WhatsAppButton';

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
            <section className='Iconos-social'>
                <img src={whatsapp} alt="icono" onClick={mensajeWhatsApp}/>
                <img src={instagram} alt="icono" onClick={mensajeInstagram} />
                <img src={facebook} alt="icono" onClick={mensajeFacebook} />
            </section>
            <WhatsAppButton /> 
            <p>
                &copy; Alejandro Di Stefano | 2da Entrega Parcial | Curso de React en CoderHouse | Comisión #39610
            </p>             
        </div>
    )
}

export default Footer;