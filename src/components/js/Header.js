import Navbar from './Navbar'
import { CartProvider } from '../../context/CartContext';

const Header = () => {
    return (
        <header className="App-header">
            <CartProvider>
                <Navbar />
            </CartProvider>

        </header>
    )
}

export default Header;