import mail from '../assets/icons/correo.png';

const Messajes = (props) => {

    return (
        <li>
            <img src={mail} onClick={props.callback} className="App-icono Cart" alt="icono" /> Mensajes {props.click}
        </li>
    )
}

export default Messajes;
