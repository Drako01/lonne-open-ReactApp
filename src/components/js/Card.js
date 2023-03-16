import Button from './Button';

const Cards = ({image, name, category, size, price, description}) => {
    const comprar = () => {
        console.log('Hice una Compra')
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
                <h3>
                    Talle: {size}
                </h3>
                <h3>
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