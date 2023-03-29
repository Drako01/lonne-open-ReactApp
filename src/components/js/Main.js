import ItemListContainer from './ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer';
import ItemCartContainer from './ItemCartContainer';
import { Routes, Route } from 'react-router-dom';
import ItemCheckoutContainer from './ItemCheckoutContainer'


const Main = () => {
    return (
        <main className="App-main">
            <Routes>
                <Route path='/' element={<ItemListContainer greeting={'PRO SHOP'} />}/>
                <Route path='/category/:categoryId' element={<ItemListContainer greeting={`Categoria: `} />}/>
                <Route path=':name/item/:itemId' element= {<ItemDetailContainer />}/>
                <Route path=':name/cart/:itemId' element= {<ItemCartContainer />}/>
                <Route path=':name/checkout/:itemId' element= {<ItemCheckoutContainer />}/>
            </Routes>
        </main>
    )
}

export default Main;
