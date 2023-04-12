import { Routes, Route } from 'react-router-dom';
import ItemListContainer from './ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer';
import Cart from './Cart'
import Payment from './Checkout'
import Contact from './Contact';
import History from './History';
import MyHistory from './MyHistory';
import ItemListDetail from './ItemListDetail'
import ItemList from './ItemList'
import OrderConfirmation from './OrderConfirmation'
import OrderConfirmationDetail from './OrderConfirmationDetail'
import ProductCharge from './ProductCharge'
import ItemDetailAdmin from './ItemDetailAdmin'
import Login from './Login';
import Signup from './Signup';



const Main = () => {
    return (
        <main className="App-main">
            <Routes>
                <Route path='/' element={<ItemListContainer greeting={'PRO SHOP'} />}/>
                <Route path='/category/:categoryId' element={<ItemListContainer greeting={`Categoria: `} />}/>
                <Route path='/:name/item/:itemId' element= {<ItemDetailContainer />}/>
                <Route path='/cart' element= {<Cart />}/>
                <Route path='/login' element= {<Login />}/>
                <Route path='/signup' element= {<Signup />}/>
                <Route path='/itemlist' element= {<ItemListDetail />}/>
                <Route path='/admin/itemlist' element= {<ItemList />}/>
                <Route path='/:name/admin/item/:itemId' element= {<ItemDetailAdmin />}/>
                <Route path='/contact' element= {<Contact  greeting={'Contactenos'}/>}/>
                <Route path='/checkout' element= {<Payment />}/>
                <Route path='/history' element= {<History />}/>
                <Route path='/myhistory' element= {<MyHistory />}/>
                <Route path='/charge/products' element= {<ProductCharge  greeting={'Carga de Productos'}/>}/>
                <Route path='/orderconfirmation' element= {<OrderConfirmation />}/>
                <Route path='/orderconfirmationdetail/:orderId' element= {<OrderConfirmationDetail />}/>
            </Routes>
        </main>
    )
}

export default Main;
