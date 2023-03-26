import Button from './Button';
import { Link } from 'react-router-dom';

const Cards = ({ id, name, description, price, size, image }) => {
    const comprar = () => {
        console.log(`Compre el Producto con Id: ${id} y se llama ${description} ${name} a un Valor de: $${price}.-`)
    }
    const favorito = () => {
        console.log(`Agregue a Favoritos el Producto con Id: ${id}, se llama ${description} ${name} a un Valor de: $${price}.-`)
    }
    const route = '/img/';

    return (
        <div className="Card">
            <img src={image} alt={name} />            

                <div className='Dates'>
                    <h2 className='TextDates'>
                        {name}
                    </h2>
                    <h3 className='TextDates'>
                        Talle: {size}
                    </h3>
                    <h3 className='Price'>
                        Precio: $ {price}.-
                    </h3>
                <img src={`${route}favoritovacio.png`} alt='Favoritos' className='Favoritos' onClick={favorito} />
                <Link to={` ${name}/item/${id}`}>Detalles</Link>
                <Button label='Comprar' callback={comprar} />               
            </div >
        </div >
    )
}

export default Cards
