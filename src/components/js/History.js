import { useState, useEffect } from "react";
import { db } from '../../Firebase/firebaseConfig';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import close from '../assets/icons/close.png'


const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { historyId } = useParams();

    useEffect(() => {
        setLoading(true);

        const fetchHistory = async () => {
            try {
                const historyRef = collection(db, 'history');
                const historyQuery = query(historyRef);

                const snapshot = await getDocs(historyQuery);

                const historyData = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const products = data.products.map((product) => {
                        return {
                            name: product.name,
                            quantity: product.quantity,
                            price: product.price
                        };
                    });
                    const historyAdapted = {
                        id: doc.id,
                        date: data.date ? data.date.toDate().toLocaleDateString() : '',
                        products: products,
                        total: data.total,
                        buyer: data.buyer,
                        email: data.email
                    };

                    return historyAdapted;
                });


                if (historyId) {
                    const selectedHistory = historyData.find(
                        (history) => history.id === historyId
                    );
                    setHistory(selectedHistory ? [selectedHistory] : []);
                } else {
                    setHistory(historyData);
                }
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [historyId]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--first)',
            cancelButtonColor: 'var(--brick)',
            confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, "history", id));
                    const newHistory = history.filter((item) => item.id !== id);
                    setHistory(newHistory);
                } catch (error) {
                    Swal.fire('Error', error.message, 'error');
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader2"></div>
            </div>
        );
    }

    return (
        <div className="checkout-payment CarroDeCompras CheckOutDiv">
            <h1 className='Mini'>Historial de Compras</h1>

            {history.length > 0 ? (
                <table className="ItemListDetail">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Comprador</th>
                            <th>E Mail</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Precio Total</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) =>
                            item.products.map((product, index) =>
                                <tr key={item.id + '_' + index}>
                                    {index === 0 && <td rowSpan={item.products.length}>{item.date}</td>}
                                    {index === 0 && <td className="LeftItem" rowSpan={item.products.length}>{item.buyer}</td>}
                                    {index === 0 && <td className="LeftItem" rowSpan={item.products.length}>{item.email}</td>}
                                    <td className="LeftItem">{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td className='PriceProducto RightItem'>${product.price}.-</td>
                                    {index === 0 && <td className='PriceProducto RightItem' rowSpan={item.products.length}>${item.total}.-</td>}
                                    {index === 0 &&
                                        <td rowSpan={item.products.length} className='EliminarItem'>
                                            <div className='HistoryDeleteButton '>
                                                <button onClick={() => handleDelete(item.id)}>
                                                    <img src={close} alt='Close' />
                                                </button>
                                            </div>
                                        </td>
                                    }
                                </tr>
                            )
                        )}
                    </tbody>

                </table>
            ) : (
                <h3>No hay historial de compras.</h3>
            )}
        </div>
    );
};
export default History;