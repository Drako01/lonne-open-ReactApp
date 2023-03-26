import ItemListContainer from './ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer';
import { Routes, Route } from 'react-router-dom';
// import FindProduct from './FindProduct';


const Main = () => {
    return (
        <main className="App-main">
            <Routes>
                <Route path='/' element={<ItemListContainer greeting={'PRO SHOP'} />}/>
                <Route path='/category/:categoryId' element={<ItemListContainer greeting={`Categoria: `} />}/>
                <Route path=':name/item/:itemId' element= {<ItemDetailContainer />}/>
                {/* <Route path='/search/:input' element= {<FindProduct />}/> */}
            </Routes>
        </main>
    )
}

export default Main;
