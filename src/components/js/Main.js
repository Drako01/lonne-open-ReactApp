import { Routes, Route } from 'react-router-dom';
import ItemListContainer from './ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer';
import Cart from './Cart'
import Payment from './Checkout'
import Contact from './Contact';
import History from './History';
import ItemListDetail from './ItemListDetail'
import OrderConfirmation from './OrderConfirmation'
import OrderConfirmationDetail from './OrderConfirmationDetail'
import ProductCharge from './ProductCharge'


const Main = () => {
    return (
        <main className="App-main">
            <Routes>
                <Route path='/' element={<ItemListContainer greeting={'PRO SHOP'} />}/>
                <Route path='/category/:categoryId' element={<ItemListContainer greeting={`Categoria: `} />}/>
                <Route path='/:name/item/:itemId' element= {<ItemDetailContainer />}/>
                <Route path='/cart' element= {<Cart />}/>
                <Route path='/itemlist' element= {<ItemListDetail />}/>
                <Route path='/contact' element= {<Contact  greeting={'Contactenos'}/>}/>
                <Route path='/checkout' element= {<Payment />}/>
                <Route path='/history' element= {<History />}/>
                <Route path='/charge/products' element= {<ProductCharge />}/>
                <Route path='/orderconfirmation' element= {<OrderConfirmation />}/>
                <Route path='/orderconfirmationdetail/:orderId' element= {<OrderConfirmationDetail />}/>
            </Routes>
        </main>
    )
}

export default Main;
