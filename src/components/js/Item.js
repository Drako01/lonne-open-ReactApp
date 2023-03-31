import { Link } from 'react-router-dom';
import ItemCount from './ItemCount'
import { useCart } from '../../context/CartContext'

const Item = ({ id, name, category, description, price, size, image, stock }) => {   
    
    const { addItem, isInCart } = useCart()

    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id, name, price, quantity
        }
        addItem(productToAdd)
    }


    return (
        <div className="Card CardDetail" id='Item-Detail'>

            <div>
                <img src={image} alt={name} />
                <div className='Dates'>

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
            </div>

            <div className='Btn'>     
            {
                    isInCart(id) ? (
                        <Link to={'../cart'} className='ProductInCart'>Pagar</Link>
                    ) : (
                        <ItemCount onAdd={handleOnAdd} stock={stock} />
                    )
                } 
                
            </div>

        </div>
    )
}

export default Item