import logo from '../assets/img/logo.png';
import ItemListContainer from './ItemListContainer'
import WhatsAppButton from './WhatsAppButton';

const Main = () => {
    return (
        <main className="App-main">
            <ItemListContainer greeting={'Bienvenidos a mi E-Commerce'}/>
            <img src={logo} className="App-logo" alt="logo" />
            <h2>PRO SHOP</h2>
            <h3>Pronto conocerás nuestras novedades</h3>    
            <WhatsAppButton />       
        </main>
    )
}

export default Main;
