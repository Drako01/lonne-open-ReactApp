import Greeting from './Greeting'
import CardsPanel from './CardsPanel';
import ItemDetailContainer from './ItemDetailContainer';

const Main = () => {
    return (
        <main className="App-main">
            <Greeting greeting={'PRO SHOP'}/>
            <CardsPanel />
            <ItemDetailContainer />
        </main>
    )
}

export default Main;
