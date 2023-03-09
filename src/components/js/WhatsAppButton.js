import btnwa from '../assets/img/whatsapp.png';

const WhatsAppButton = (props) => {

    return (        
        <img src={ btnwa } onClick={ props.callback } className="WhatsApp" alt="WhatsApp icono" />         
    )
}

export default WhatsAppButton;
