import { useState, useEffect } from "react";
import { db } from '../../Firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OrderConfirmationDetail = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { orderId } = useParams();

    useEffect(() => {
        setLoading(true);

        const fetchProduct = async () => {
            try {
                const productDoc = doc(db, 'history', orderId);
                const snapshot = await getDoc(productDoc);

                if (snapshot.exists()) {
                    const productData = snapshot.data();
                    setProduct(productData);
                }
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [orderId]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader2"></div>
            </div>
        );
    }

    if (!product) {
        Swal.fire({
            title: 'Error',
            text: 'Producto no encontrado',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--brick)',
        }).then(() => {
            navigate('/history');
        });
        return null;
    }
    

    const { buyer, products, total } = product;

    return (        
        <div className='OrderConfirmation OutStock OrderFinal'>
            <section>
                <h2>Orden de Compra con ID#:</h2>
                <h3>{orderId}</h3>
                <h6>Nombre del comprador:</h6>
                <h3>{buyer}</h3>
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
                        {products.map((product, id) => (
                            <tr key={id}>
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
                <button onClick={handlePrint}>Imprimir</button>
                <Link to='/history'>Volver</Link>
            </div>
        </div>
    );
};

export default OrderConfirmationDetail;
