import Header from './components/js/Header'
import Main from './components/js/Main'
import Footer from './components/js/Footer'
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <div>
      <CartProvider>     
        <BrowserRouter>
          <Header />
          <Main />
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}


export default App;
