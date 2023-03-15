import ItemListContainer from './ItemListContainer'
import CardsPanel from './CardsPanel';

const Main = () => {
    return (
        <main className="App-main">
            <ItemListContainer greeting={'PRO SHOP'}/>
            <CardsPanel />
        </main>
    )
}

export default Main;
