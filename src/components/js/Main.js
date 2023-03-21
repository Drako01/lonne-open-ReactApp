import ItemListContainer from './ItemListContainer'
import CardsPanel from './CardsPanel';
import CardDetails from './CardDetails';

const Main = () => {
    return (
        <main className="App-main">
            <ItemListContainer greeting={'PRO SHOP'}/>
            <CardsPanel />
            <CardDetails />
        </main>
    )
}

export default Main;
