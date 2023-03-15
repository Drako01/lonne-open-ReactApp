import tenis from '../assets/img/zapa-wilson_1.png'
import Button from './Button';

const Cards = () => {
    const comprar = () => {
        console.log('Hice una Compra')
    }
    return (
        <div className="Card">
            <img src={tenis} alt="Jugador de Tenis" />
            <div>
                <h2>Subtitulo</h2>
                <h3>Otro subtitulo</h3>
                <p>
                    Parrafo descriptivo
                </p>
                <p>
                    $ 1.000.-
                </p>
            </div>
            <div>
                <Button label='Comprar' callback={comprar}/>
            </div>
        </div>
    )
}

export default Cards