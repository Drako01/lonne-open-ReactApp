import Button from './Button';

const Cards = ({id, name, category, description, size, price, image, stock}) => {
    const comprar = () => {
        console.log(`Compre el Producto con Id: ${id} y se llama ${description} ${name} a un Valor de: $${price}.-`)
    }   

    return (
        <div className="Card">
            <img src={image} alt={name} />
            <div>
                <h2>{name}</h2>
                <h3>{category}</h3>
                <p>
                    {description}
                </p>
                <p>
                    En Stock: {stock}
                </p>
                <h3>
                    Talle: {size}
                </h3>
                <h3 className='Price'>
                    Precio: $ {price}.-
                </h3>
            </div>
            <div>
                <Button label='Comprar' callback={comprar} />
            </div>
        </div>
    )
}

export default Cards