import React from 'react';
import { db } from '../../Firebase/firebaseConfig';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';

class OrderConfirmation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            buyer: '',
            products: [],
            total: '',
        };
    }
    handlePrint = () => {
        window.print();
    }
    componentDidMount() {
        const getLastCheckout = async () => {
            const q = query(collection(db, 'history'), orderBy('date', 'desc'), limit(1));
            const querySnapshot = await getDocs(q);
            const lastCheckout = querySnapshot.docs[0].data();
            const lastDocId = querySnapshot.docs[0].id;
            return { lastCheckout, lastDocId };
        };

        getLastCheckout().then(({ lastCheckout, lastDocId }) => {
            this.setState({
                id: lastDocId,
                buyer: lastCheckout.buyer,
                products: lastCheckout.products,
                total: lastCheckout.total
            });
        });
    }

    render() {
        const { id, buyer, products, total } = this.state;

        return (
            <div className='OrderConfirmation OutStock OrderFinal'>
                <section>
                <h2>Orden de Compra con ID#:</h2><h3>  {id}</h3>
                <h6>Nombre del comprador:</h6><h3> {buyer}</h3>
                <table className="ItemListDetail OrderConfirmationTable">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className='LeftItem'>{product.name}</td>
                                <td className='PriceProducto'>${product.price}.-</td>
                                <td>{product.quantity}</td>
                                <td className='PriceProducto'>${product.price * product.quantity}.-</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4">
                                <div className='OrderPriceFinal'>
                                    <span>
                                        Precio Total:
                                    </span>
                                    <span className='PriceProducto'>${total}.-</span>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>                    
                </section>
                <div className='ComprarFinal OrderFinalButton oculto-impresion'>
                    <button onClick={this.handlePrint}>Imprimir</button>
                    <Link to='/' className=''>Volver</Link>
                </div>
            </div>
        );
    }
}

export default OrderConfirmation;
