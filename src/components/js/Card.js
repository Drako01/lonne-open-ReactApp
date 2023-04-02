import { Link } from 'react-router-dom';
import ItemCount from './ItemCount'
import { useCart } from '../../context/CartContext'


const Cards = ({ id, name, price, size, image, stock }) => {    

    const { addItem, getItemCount, isInCart } = useCart()

    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id, name, price, quantity
        }
        addItem(productToAdd)
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
                
                {
                    isInCart(id) ? (
                        <Link to={` ${name}/item/${id}`} className="DontView">Detalles</Link>
                    ) : (
                        <Link to={` ${name}/item/${id}`}>Detalles</Link>
                    )
                }
                {
                    isInCart(id) ? (
                        <Link className='ProductInCart'>{ getItemCount(id)} Productos en el Carrito</Link>
                    ) : (
                        <ItemCount onAdd={handleOnAdd} stock={stock} />
                    )
                }                
            </div >
        </div >
    )
}

export default Cards