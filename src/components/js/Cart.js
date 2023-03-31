import { useCart } from '../../context/CartContext';

const Cart = () => {


    const { cart, totalPrice } = useCart()

    const products = [cart]
    const pricing = totalPrice

    console.log(`Total: $${pricing}.-`)


    products.forEach(producto => {
        producto.forEach(prod => {

            console.log(prod.id)

            console.log(prod.name)

            console.log(prod.price)

            console.log(prod.quantity)

        })
    })

    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="tabla"></tr>
                </tbody>


            </table >
            {`Total: $${pricing}.-`}
        </section>

    )
}

export default Cart