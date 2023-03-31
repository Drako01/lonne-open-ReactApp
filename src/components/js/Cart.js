import { useCart } from '../../context/CartContext';
import close from '../assets/icons/close.png'
import { Link } from 'react-router-dom';


const Cart = () => {


    const { totalPrice, cart } = useCart()
    const cartItems = cart
    const pricing = totalPrice

    return (
        <section>
            <h1>Carro de Compras</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Wilson Combinada Hombre</td>
                        <td>$30000</td>
                        <td>2</td>
                        <td className='EliminarItem'>
                            <Link to='/' ><img src={close} alt='Close' /></Link>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Wilson Combinada Niños</td>
                        <td>$37500</td>
                        <td>1</td>
                        <td className='EliminarItem'>
                            <Link to='/' ><img src={close} alt='Close' /></Link>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Wilson Combinada Mujer</td>
                        <td>$29800</td>
                        <td>2</td>
                        <td className='EliminarItem'>
                            <Link to='/' ><img src={close} alt='Close' /></Link>
                        </td>
                    </tr>
                </tbody>

            </table >
            {
                cartItems.forEach(p => {
                    console.log(`Tengo el producto con el id: ${p.id}`)
                    console.log(`Este producto se llama: ${p.name}`)
                    console.log(`y vale: ${p.price}`)
                    console.log(`Compré: ${p.quantity}`)
                })
            }


            <h3 className='PrecioTotal'>{`Total: $${pricing}.-`}</h3>
            <div className='ComprarFinal'>
                <Link >Comprar</Link>
            </div>

        </section>

    )
}

export default Cart