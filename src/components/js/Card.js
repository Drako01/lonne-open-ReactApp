import { Link } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';



const Cards = ({ id, name, price, size, description, image }) => {
    

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
                <Link to={` ${name}/item/${id}`}>Detalles</Link>
                <Link to={`${name}/cart/${id}`}>Agregar al Carrito <ShoppingCart/> </Link>
            </div >
        </div >
    )
}

export default Cards