import Button from './Button';


const CardDetails = () => {
    const route = '/img/';
    const comprar = () => {
        console.log(`Compre el Producto Seleccionado`)
    } 
    const favorito = () => {
        console.log(`Agregue a Favoritos el Producto Seleccionado`)
    }
    return (
        <div className="Card CardDetail">           

                <div>
                    <img src={`${route}zapa-wilson_1.png`} alt="Foto" />
                    <div className='Dates'>
                    <img src={`${route}favoritolleno.png`} alt='Favoritos' className='Favoritos'  onClick={favorito}/>
                        <h2>Wilson Combinada Hombre </h2> 
                        <h3>Zapatillas</h3>
                        <p>
                            Zapatillas de tenis en Negro y Blanco
                        </p>
                        <p>
                            En Stock: 20
                        </p>
                        <h3>
                            Talle: 40
                        </h3>
                        <h3 className='Price'>
                            Precio: $ 30.000.-
                        </h3>
                    </div>
                </div>

                <div className='Btn'>                
                    <Button label='Comprar' callback={comprar}/>
                </div>

        </div>
    )
}

export default CardDetails