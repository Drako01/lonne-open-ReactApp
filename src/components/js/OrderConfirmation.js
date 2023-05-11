import React from 'react';
import { db } from '../../Firebase/firebaseConfig';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';

class OrderConfirmation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            buyer: '',
            products: [],
            total: '',
            date: '',
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
            const date = lastCheckout.date.toDate().toLocaleDateString('es-AR');
            this.setState({
                id: lastDocId,
                buyer: lastCheckout.buyer,
                products: lastCheckout.products,
                total: lastCheckout.total,
                date: date
            });
        });
    }


    render() {
        const { id, buyer, products, total, date } = this.state;

        return (
            <div className='OrderConfirmation OutStock OrderFinal'>
                <section>
                    <Typography variant="h4">Recibo de Compra con ID#: {id}</Typography>                    
                    <Typography variant="h6">Nombre del comprador: {buyer}</Typography>                    
                    <Typography>{date}</Typography>
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
                                {products.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>${parseFloat(product.price).toFixed(2)}.-</TableCell>
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
                    <Button variant="contained" onClick={this.handlePrint}>Imprimir</Button>
                    <Link to='/' className=''>Volver</Link>
                </div>
            </div>
        );
    }
}

export default OrderConfirmation;
