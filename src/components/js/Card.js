import Button from './Button';

const Cards = ({ id, name, category, description, price, size, image }) => {
    const comprar = () => {
        console.log(`Compre el Producto con Id: ${id} y se llama ${description} ${name} a un Valor de: $${price}.-`)
    }
    const detalles = () => {
        console.log(`Detalle del Producto con Id: ${id}, se llama ${description} ${name} a un Valor de: $${price}.-`)
    }
    const favorito = () => {
        console.log(`Agregue a Favoritos el Producto con Id: ${id}, se llama ${description} ${name} a un Valor de: $${price}.-`)
    }
    const route = '/img/';

    return (
        <div className="Card">
            <img src={image} alt={name} />            

                <div className='Dates'>
                    <h2>{name}</h2>
                    <h3>Talle: {size}</h3>
                    <h3 className='Price'>
                        Precio: $ {price}.-
                    </h3>
                {/* </div>
            
            <div className='Btn'> */}
                <img src={`${route}favoritovacio.png`} alt='Favoritos' className='Favoritos' onClick={favorito} />
                <Button label='Detalles' callback={detalles} />
                <Button label='Comprar' callback={comprar} />                
            </div >
        </div >
    )
}

export default Cards