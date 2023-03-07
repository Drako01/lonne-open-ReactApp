import Navbar from './Navbar'
import logo from '../assets/img/logo.png';

const Header = () => {
    return (
        <header className="App-header">
            <Navbar />
            <img src={logo} className="App-logo" alt="logo" />
            <h2>PRO SHOP</h2>
            <h3>Conocé nuestras Novedades</h3>
        </header>

    )
}

export default Header;