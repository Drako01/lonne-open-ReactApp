import { useState, useEffect } from "react";
import { db } from '../../Firebase/firebaseConfig';
import { collection, query, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

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

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader2"></div>
            </div>
        );
    }
    const handleDelete = (index) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                const newHistory = [...history];
                newHistory.splice(index, 1);
                setHistory(newHistory);
            }
        });
    };



    return (
        <div className="checkout-payment CheckOutDiv">
            <h1>Historial de Compras</h1>
            {history.length > 0 ? (
                <table className="ItemListDetail">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td className="LeftItem">{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td><div className='ComprarFinal FinalButtons'>
                                    <button onClick={() => handleDelete(index)}>Eliminar</button>
                                </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            ) : (
                <p>No se encontró historial de compras.</p>
            )}

        </div>
    );
};

export default History;
