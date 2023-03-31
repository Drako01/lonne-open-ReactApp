import ItemListContainer from './ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer';
import { Routes, Route } from 'react-router-dom';
import Cart from './Cart'
import Checkout from './Checkout'
import Payment from './Payment'

const Main = () => {
    return (
        <main className="App-main">
            <Routes>
                <Route path='/' element={<ItemListContainer greeting={'PRO SHOP'} />}/>
                <Route path='/category/:categoryId' element={<ItemListContainer greeting={`Categoria: `} />}/>
                <Route path=':name/item/:itemId' element= {<ItemDetailContainer />}/>
                <Route path='/cart' element= {<Cart />}/>
                <Route path='/checkout' element= {<Checkout />}/>
                <Route path='/payment' element= {<Payment />}/>
            </Routes>
        </main>
    )
}

export default Main;
