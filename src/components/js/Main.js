import ItemListContainer from './ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer';

const Main = () => {
    return (
        <main className="App-main">
            <ItemListContainer  greeting={'PRO SHOP'}/>
            <ItemDetailContainer />
        </main>
    )
}

export default Main;
