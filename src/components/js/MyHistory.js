import { useState, useEffect } from "react";
import { db, auth } from '../../Firebase/firebaseConfig';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import buscar from '../assets/icons/search.png';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';

const MyHistory = () => {
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

                if (
                    auth.currentUser &&
                    historyData.some((history) => history.email === auth.currentUser.email)
                ) {
                    const userHistoryData = historyData.filter(
                        (history) => history.email === auth.currentUser.email
                    );
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
        <div className="checkout-payment CarroDeCompras CheckOutDiv OcultoParaCelu">
            <Typography variant="h1" className="Mini">Historial de Compras</Typography>

            {history.length > 0 ? (
                <Table className="ItemListDetail">
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Comprador</TableCell>
                            <TableCell>E Mail</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Precio Unitario</TableCell>
                            <TableCell>Precio Total</TableCell>
                            <TableCell>Orden</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((item) =>
                            item.products.map((product, index) => (
                                <TableRow key={item.id + '_' + index}>
                                    {index === 0 && <TableCell rowSpan={item.products.length}>{item.date}</TableCell>}
                                    {index === 0 && <TableCell className="LeftItem" rowSpan={item.products.length}>{item.buyer}</TableCell>}
                                    {index === 0 && <TableCell className="LeftItem" rowSpan={item.products.length}>{item.email}</TableCell>}
                                    <TableCell className="LeftItem">{product.name}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell className=' RightItem'>${product.price}.-</TableCell>
                                    {index === 0 && <TableCell className=' RightItem' rowSpan={item.products.length}>${item.total.toFixed(2)}.-</TableCell>}
                                    {index === 0 && (
                                        <TableCell rowSpan={item.products.length}>
                                            <div className='ComprarFinal FinalButtons SearchButton'>
                                                <Link to={`/orderconfirmationdetail/${item.id}`}>
                                                    <img src={buscar} className="App-icono Car CarritoList" alt="icono" />
                                                </Link>
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            ) : (
                <Typography variant="h3">¡Aún no has hecho ninguna Compra!</Typography>
            )}
        </div>
    );
};

export default MyHistory;

