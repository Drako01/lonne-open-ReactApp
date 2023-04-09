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
            <div className='OutStock'>
                <h2>Orden de Compra # {id}</h2>
                <h3>Nombre del comprador: {buyer}</h3>
                <table className="ItemListDetail">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className='LeftItem'>{product.name}</td>
                                <td className='PriceProducto'>${product.price}.-</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='ComprarFinal'>
                    <p>Precio Total: <span className='PriceProducto'>${total}.-</span></p>
                    <Link to='/' className=''>Volver</Link>
                </div>
            </div>
        );
    }
}

export default OrderConfirmation;
