import { Link } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';
import NotLike from './NotLike';



const Cards = ({ id, name, price, size,description, image }) => {
    
    //Usar useEfect
    const favorito = () => {        
        console.log(`Se agrego a Favoritos el Id: ${id} y se llama ${description} ${name} a un Valor de: $${price}.- Desde la Card`)
    }

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
                <Link onClick={favorito} className="Fav-Icon"><NotLike/></Link>                
                <Link to={` ${name}/item/${id}`}>Detalles</Link>
                <Link to={`${name}/cart/${id}`}>Agregar al Carrito <ShoppingCart/> </Link>
            </div >
        </div >
    )
}

export default Cards