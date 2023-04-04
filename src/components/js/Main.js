import ItemListContainer from './ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer';
import { Routes, Route } from 'react-router-dom';
import Cart from './Cart'
import Payment from './Checkout'

const Main = () => {
    return (
        <main className="App-main">
            <Routes>
                <Route path='/' element={<ItemListContainer greeting={'PRO SHOP'} />}/>
                <Route path='/category/:categoryId' element={<ItemListContainer greeting={`Categoria: `} />}/>
                <Route path='/:name/item/:itemId' element= {<ItemDetailContainer />}/>
                <Route path='/cart' element= {<Cart />}/>
                <Route path='/checkout' element= {<Payment />}/>
            </Routes>
        </main>
    )
}

export default Main;
