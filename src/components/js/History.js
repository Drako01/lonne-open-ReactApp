import { useState, useEffect } from "react";
import { db, auth } from '../../Firebase/firebaseConfig';
import { collection, query, getDocs, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Table, TableRow, TableCell, TableHead, TableBody, Button, Typography } from '@mui/material';


const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { historyId } = useParams();
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.email === process.env.REACT_APP_MAIL_Admin) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        });
        return unsubscribe;
    }, []);


    const handleDelete = async (id) => {
        await Swal.fire({
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
    }

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader2"></div>
            </div>
        );
    }

    const handleOnClick = () => {
        navigate('/');
    };

    return (
        (authenticated) ? (
            <>
                <div className="checkout-payment CarroDeCompras CheckOutDiv OcultoParaCelu">
                    <h1 className='Mini'>Historial de Compras</h1>

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
                                    <TableCell>Eliminar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history.map((item) =>
                                    item.products.map((product, index) => (
                                        <TableRow key={item.id + '_' + index}>
                                            {index === 0 && (
                                                <TableCell rowSpan={item.products.length}>{item.date}</TableCell>
                                            )}
                                            {index === 0 && (
                                                <TableCell className="LeftItem" rowSpan={item.products.length}>
                                                    {item.buyer}
                                                </TableCell>
                                            )}
                                            {index === 0 && (
                                                <TableCell className="LeftItem" rowSpan={item.products.length}>
                                                    {item.email}
                                                </TableCell>
                                            )}
                                            <TableCell className="LeftItem">{product.name}</TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell className=' RightItem'>${product.price}.-</TableCell>
                                            {index === 0 && (
                                                <TableCell className=' RightItem' rowSpan={item.products.length}>
                                                    ${item.total.toFixed(2)}.-
                                                </TableCell>
                                            )}
                                            {index === 0 && (
                                                <TableCell rowSpan={item.products.length}>
                                                    <div className='ComprarFinal FinalButtons SearchButton'>
                                                        <Link to={`/orderconfirmationdetail/${item.id}`}>
                                                            <SearchIcon className="App-icono Car CarritoList dark-icon" />
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                            )}
                                            {index === 0 && (
                                                <TableCell rowSpan={item.products.length} className='EliminarItem'>
                                                    <div className='HistoryDeleteButton'>
                                                        <Button onClick={() => handleDelete(item.id)}>
                                                            <CloseIcon className="dark-icon" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    ) : (
                        <h3>No hay historial de compras disponible.</h3>
                    )}
                </div>
                <div className="back-to-home">
                    <Button variant="contained" color="primary" onClick={handleOnClick}>
                        Volver al inicio
                    </Button>
                </div>
            </>
        ) : (
            <>                
                <Typography variant="h1" className='Mini'>Acceso denegado</Typography>
                <Link to={'/'}>Volver</Link>
            </>
        )
    );
};

export default History;

