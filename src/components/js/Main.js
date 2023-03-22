import ItemListContainer from './ItemListContainer'
import CardsPanel from './CardsPanel';
import ItemDetailContainer from './ItemDetailContainer';

const Main = () => {
    return (
        <main className="App-main">
            <ItemListContainer greeting={'PRO SHOP'}/>
            <CardsPanel />
            <ItemDetailContainer />
        </main>
    )
}

export default Main;
