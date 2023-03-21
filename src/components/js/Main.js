import ItemListContainer from './ItemListContainer'
import CardsPanel from './CardsPanel';
import CarrouselPhotos from './Carrousel';

const Main = () => {
    return (
        <main className="App-main">
            <ItemListContainer greeting={'PRO SHOP'}/>
            <CardsPanel />
            <CarrouselPhotos />
        </main>
    )
}

export default Main;
