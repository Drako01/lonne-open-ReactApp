import { useCart } from '../../context/CartContext';

const Cart = () => {
    
    const { cart } = useCart()

    
    return (
        console.log(cart)
    )
}

export default Cart