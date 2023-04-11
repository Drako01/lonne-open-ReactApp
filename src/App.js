import Header from './components/js/Header'
import Main from './components/js/Main'
import Footer from './components/js/Footer'
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />
            <Main />
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}


export default App;
