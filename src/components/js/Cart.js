import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Typography,
    Link as MUILink,
    Card,
    CardContent,
    CardActions,
    IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const Cart = () => {
    const { totalPrice, cart, removeItem, totalQuantity, clearCart } = useCart();
    const navigate = useNavigate();
    const totalQuantityInCart = totalQuantity;

    const clear = () => {
        Swal.fire({
            title: '¿Estás seguro de vaciar el carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--first)',
            cancelButtonColor: 'var(--brick)',
            confirmButtonText: 'Vaciar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                Swal.fire('Vacío', 'El carrito ha quedado vacío.', 'success');
            }
        });
    };

    const clickRemoveItem = (id) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar este producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--first)',
            cancelButtonColor: 'var(--brick)',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                removeItem(id);
                Swal.fire('Eliminado', 'El producto ha sido eliminado del carrito', 'success');
            }
        });
    };

    const Comprar = () => {
        const handleOnClick = () => {
            navigate('/checkout');
        };
        const total = totalPrice;

        Swal.fire({
            title: 'Confirmar compra',
            html: `El valor total de tu compra es de $${total}.<br>¿Desea continuar?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--first)',
            cancelButtonColor: 'var(--brick)',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        })
            .then((result) => {
                if (result.isConfirmed) {
                    handleOnClick();
                }
            })
            .catch((error) => {
                Swal.fire('Error', error.message, 'error');
            });
    };

    const cartItems = cart.map((p) => (
        <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>
                <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px' }} />
            </TableCell>
            <TableCell>{`$${p.price}.-`}</TableCell>
            <TableCell>{p.quantity}</TableCell>
            <TableCell>{`$${(p.quantity * p.price).toFixed(2)}`}</TableCell>            
                <TableCell className='Grey'>
                    <IconButton onClick={() => clickRemoveItem(p.id)} aria-label="Eliminar">
                        <DeleteIcon />
                    </IconButton>
                </TableCell>           
        </TableRow>
    ));

    return (
        <section className="CarroDeCompras mobile-view">
            <h1 className="Mini">Carro de Compras</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Foto</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell>Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{cartItems}</TableBody>
            </Table>
            {totalQuantityInCart < 1 ? (
                <Card sx={{ mt: 4, p: 2 }}>
                    <CardContent>
                        <Typography variant="h6">El Carrito está Vacío.</Typography>
                    </CardContent>
                    <CardActions>
                        <MUILink component={Link} to="/" variant="button">
                            Volver
                        </MUILink>
                    </CardActions>
                </Card>
            ) : (
                <Card sx={{ mt: 4, p: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{`Total: $${totalPrice.toFixed(2)}.-`}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" color="error" onClick={clear}>
                            Vaciar Carrito
                        </Button>
                        <Button variant="contained" color="primary" onClick={Comprar}>
                            Comprar
                        </Button>
                    </CardActions>
                </Card>
            )}
        </section>
    );
};

export default Cart;

