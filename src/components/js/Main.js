import ItemListContainer from './ItemListContainer'
import CardsPanel from './CardsPanel';
import ItemDetailContainer from './ItemDetailContainer';
import axios from 'axios';

const API_ENDPOINT = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

axios.get(API_ENDPOINT)
    .then(response => {
        const dolarHoy = response.data.find(item => item.casa.nombre === 'Dolar Oficial');

        const div = document.createElement("div");
        const mainDiv = document.querySelectorAll('.App-main')[0]
        mainDiv.append(div)   
        div.className = 'Dollar'     
        div.innerHTML = `<h2>Referencia:</h2>
                        <h3>El valor del dólar Oficial hoy es de: $${dolarHoy.casa.venta}.-</h3>`;

    })
    .catch(error => {
        console.error(error);
    });

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
