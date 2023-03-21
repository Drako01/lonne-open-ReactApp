import favicon from '../assets/icons//favorito-icon.png';

const Favorites = (props) => {

    return (
        <li>
            <img src={favicon} onClick={props.callback} className="App-icono Cart" alt="icono" /> {props.click}
        </li>
    )
}

export default Favorites;
