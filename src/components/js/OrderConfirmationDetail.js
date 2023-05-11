import { useState, useEffect } from "react";
import { db } from '../../Firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { auth } from '../../Firebase/firebaseConfig';

const OrderConfirmationDetail = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
            if (authenticatedUser) {
                setAuthenticated(true);
                setUser(authenticatedUser);
            } else {
                setAuthenticated(false);
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

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

    const { buyer, products, total, date } = product;
    const formattedDate = new Date(date.toDate()).toLocaleDateString();

    return (
        <div className='OrderConfirmation OutStock OrderFinal'>
            <section>
                <Typography variant="h4">Recibo de Compra con ID#: {orderId}</Typography>
                <Typography variant="h6">Nombre del comprador: {buyer}</Typography>
                <Typography>{formattedDate}</Typography>
                <TableContainer>
                    <Table className="ItemListDetail OrderConfirmationTable">
                        <TableHead>
                            <TableRow>
                                <TableCell>Producto</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Subtotal</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product, id) => (
                                <TableRow key={id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>${product.price}.-</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>${(parseFloat(product.price) * product.quantity).toFixed(2)}.-</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan="4">
                                    <div className='OrderPriceFinal'>
                                        <Typography variant="span">Precio Total:</Typography>
                                        <Typography variant="span">${parseFloat(total).toFixed(2)}.-</Typography>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
            <div className='ComprarFinal OrderFinalButton oculto-impresion'>
                <Button variant="contained" onClick={handlePrint}>Imprimir</Button>
                {authenticated && user.email === "admin@mail.com" ? (
                    <Link to='/history'>Volver</Link>
                ) : (
                    <Link to='/myhistory'>Volver</Link>
                )}
            </div>
        </div>
    );
};

export default OrderConfirmationDetail;