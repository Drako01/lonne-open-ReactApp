import Greeting from './Greeting'
import ItemListContainer from './ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer';

const Main = () => {
    return (
        <main className="App-main">
            <Greeting greeting={'PRO SHOP'}/>
            <ItemListContainer />
            <ItemDetailContainer />
        </main>
    )
}

export default Main;
