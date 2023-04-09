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
                    const historyAdapted = {
                        id: doc.id,
                        date: data.date ? data.date.toDate().toLocaleDateString() : '',
                        name: data.products[1] ? data.products[1].name : '',
                        quantity: data.products[1] ? data.products[1].quantity : '',
                        price: data.products[1] ? data.products[1].price : '',
                        total: data.total
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
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
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
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Precio Total</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                            <tr key={item.id}>
                                <td>{item.date}</td>
                                <td className="LeftItem">{item.name}</td>
                                <td>{item.quantity}</td>
                                <td className='PriceProducto RightItem'>${item.price}.-</td>
                                <td className='PriceProducto RightItem'> ${(item.price*item.quantity)}.-</td>
                                <td className='EliminarItem'>
                                    <div className='HistoryDeleteButton '>
                                        <button onClick={() => handleDelete(item.id)}>
                                            <img src={close} alt='Close' />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay historial de compras.</p>
            )}
        </div>
    );
};
export default History;