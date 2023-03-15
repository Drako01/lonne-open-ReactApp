import btnwa from '../assets/img/whatsapp.png';

const WhatsAppButton = () => {
    const mensajeWhatsApp = () => {
        window.open("https://wa.me/5492257548207?text=Hola!%20Me%20gustaría%20tener%20información%20sobre%20los%20servicios%20que%20ofrecen.!")
    }
    return (        
        <img src={ btnwa } onClick={ mensajeWhatsApp } className="WhatsApp" alt="WhatsApp icono" />         
    )
}

export default WhatsAppButton;
