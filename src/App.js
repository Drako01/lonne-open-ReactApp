import logo from './components/assets/img/logo.png';
import Navbar from './components/js/Navbar.js'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />  
        <h2>PRO SHOP</h2>   
        <h3>Conocé nuestras Novedades</h3>   
      </header>
    </div>
  );
}

export default App;
