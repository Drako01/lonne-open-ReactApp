import Header from './components/js/Header'
import Main from './components/js/Main'
import Footer from './components/js/Footer'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>

    </div>
  );
}


export default App;
