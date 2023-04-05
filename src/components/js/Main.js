import { Routes, Route } from 'react-router-dom';
import ItemList from './ItemList';
import ItemDetailContainer from './ItemDetailContainer';
import Cart from './Cart'
import Payment from './Checkout'
import Contact from './Contact';


const Main = () => {
    return (
        <main className="App-main">
            <Routes>
                <Route path='/' element={<ItemList greeting={'PRO SHOP'} />}/>
                <Route path='/category/:categoryId' element={<ItemList greeting={`Categoria: `} />}/>
                <Route path='/:name/item/:itemId' element= {<ItemDetailContainer />}/>
                <Route path='/cart' element= {<Cart />}/>
                <Route path='/contact' element= {<Contact />}/>
                <Route path='/checkout' element= {<Payment />}/>
            </Routes>
        </main>
    )
}

export default Main;
