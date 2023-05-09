import { useState, useEffect } from "react";
import { db, auth } from '../../Firebase/firebaseConfig';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import buscar from '../assets/icons/search.png';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { historyId } = useParams();
    const [, setUser] = useState(null);

    useEffect(() => {
        setLoading(true);

        const fetchHistory = async () => {
            try {
                const historyRef = collection(db, 'history');
                const historyQuery = query(historyRef, orderBy('date', 'desc'));

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

                if (auth.currentUser && historyData.some((history) => history.email === auth.currentUser.email)) {
                    const userHistoryData = historyData.filter((history) => history.email === auth.currentUser.email);
                    if (historyId) {
                        const selectedHistory = userHistoryData.find((history) => history.id === historyId);
                        setHistory(selectedHistory ? [selectedHistory] : []);
                    } else {
                        setHistory(userHistoryData);
                    }
                } else {
                    setHistory([]);
                }
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        fetchHistory();

        return () => unsubscribe();
    }, [historyId]);

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
                            <th>Orden</th>
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
                                    {index === 0 && <td rowSpan={item.products.length} >
                                        <div className='ComprarFinal FinalButtons SearchButton'>
                                            <Link to={`/orderconfirmationdetail/${item.id}`}>
                                                <img src={buscar} className="App-icono Car CarritoList" alt="icono" />
                                            </Link>
                                        </div>
                                    </td>
                                    }
                                    

                                </tr>
                            )
                        )}
                    </tbody>

                </table>
            ) : (
                <h3>¡Aún no has hecho ninguna Compra.!</h3>
            )}
        </div>
    );
};
export default History;