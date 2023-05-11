import React, { useState, useEffect } from "react";
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import 'firebase/firestore';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../Firebase/firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';


const useStyles = makeStyles({
    checkOutDiv: {
        // Agrega estilos personalizados para el div CheckOutDiv
    },
    title: {
        // Agrega estilos personalizados para el título
    },
    itemListDetail: {
        // Agrega estilos personalizados para la tabla
    },
    leftItem: {
        // Agrega estilos personalizados para la celda izquierda
    },
    totalRow: {
        // Agrega estilos personalizados para la fila del total
    },
    priceProducto: {
        // Agrega estilos personalizados para el precio del producto
    },
});


const Checkout = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [focus, setFocus] = useState("");
    const [email, setEmail] = useState('');
    const [reEmail, setReEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [user, setUser] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const vaciarCarrito = () => {
        clearCart();
    };

    const guardarCompraEnHistorial = async () => {
        const purchase = {
            date: new Date(),
            total: totalPrice,
            products: cart,
            card: number,
            buyer: name,
            email: email || user.email,
        };

        try {
            await addDoc(collection(db, "history"), purchase);

            await Promise.all(cart.map(async (product) => {
                const productDocRef = doc(db, "products", product.id);
                const productDoc = await getDoc(productDocRef);
                const currentQuantity = productDoc.data().stock;
                const purchasedQuantity = product.quantity;
                const newQuantity = currentQuantity - purchasedQuantity;
                await updateDoc(productDocRef, { stock: newQuantity });
            }));

            Swal.fire({
                title: '¡Compra exitosa!',
                html: `Gracias por comprar en Lonne Open`,
                icon: 'success',
                didClose: () => {
                    vaciarCarrito();
                    navigate('/orderconfirmation');
                }
            });
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    }

    const handleOnClick = () => {
        if (cart.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Lo siento.!',
                text: 'No hay ningún producto en el carrito!',
                confirmButtonColor: 'var(--brick)',
            }).then(() => {
                navigate('/');
            });
        } else if (name.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Lo siento.!',
                text: 'Debe completar todos los Datos',
                confirmButtonColor: 'var(--brick)',
            })
        } else {
            guardarCompraEnHistorial();
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "number":
                if (/^[0-9\s]{0,19}$/.test(value)) setNumber(value)
                break;
            case "name":
                if (/^[a-zA-Z\s]{0,23}$/.test(value)) setName(value)
                break;
            case "expiry":
                setExpiry(value)
                break;
            case "cvc":
                if (/^[0-9]{0,3}$/.test(value)) setCvc(value)
                break;
            default:
                break;
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleReEmailChange = (e) => {
        setReEmail(e.target.value);
    };

    const handleReEmailBlur = () => {
        if (email !== reEmail) {
            setEmailError()
            Swal.fire({
                icon: 'error',
                title: 'Los correos electrónicos no coinciden',
                text: 'Por favor, ingrese el mismo correo electrónico en ambos campos',
            });
        } else {
            setEmailError('');
        }
    };

    return (
        <div>
            <h1 className="Mini">Checkout</h1>
            <div className={classes.checkOutDiv}>
                <h3 className={classes.title}>Resumen de Compra</h3>
                <Table className={classes.itemListDetail}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className={classes.leftItem}>{product.name}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>${product.price * product.quantity}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow className={classes.totalRow}>
                            <TableCell className={classes.priceProducto} colSpan="3">Total:</TableCell>
                            <TableCell className={classes.priceProducto}>${totalPrice.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className="checkout-payment CheckOutDiv">
                <h3>Confirme su E Mail</h3>
                {user ?
                    (
                        <div>
                            <form className="CreditCardForm">
                                <div className="LonneInput">
                                    <label htmlFor="username">Email:</label>
                                    <input type="email" name="email" value={user.email} />
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <form className="CreditCardForm">
                                <div className="LonneInput">
                                    <label htmlFor="username">Email:</label>
                                    <input type="email" name="email" value={email} onChange={handleEmailChange} required />
                                </div>
                                <div className="LonneInput">
                                    <label htmlFor="username">Repita su Email:</label>
                                    <input type="email" name="reEmail" value={reEmail} onChange={handleReEmailChange} onBlur={handleReEmailBlur} required />
                                    {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                                </div>
                            </form>
                        </div>
                    )

                }


                <h3>Payment Details</h3>
                <div>
                    <Cards
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focus}
                    />
                    <form className="CreditCardForm" >
                        <input
                            type="tel"
                            name="number"
                            maxLength="16"
                            placeholder="Número del Titular de la Tarjeta"
                            value={number}
                            onChange={handleInputChange}
                            onFocus={(e) => setFocus(e.target.name)}
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            maxLength="22"
                            placeholder="Nombre y Apellido"
                            value={name}
                            onChange={handleInputChange}
                            onFocus={(e) => setFocus(e.target.name)}
                            required
                        />
                        <div className="FinalDates">
                            <input
                                type="tel"
                                name="expiry"
                                maxLength="4"
                                placeholder="Expiración (MM/AA)"
                                value={expiry}
                                onChange={handleInputChange}
                                onFocus={(e) => setFocus(e.target.name)}
                                required
                            />
                            <input
                                className="CVC"
                                type="tel"
                                name="cvc"
                                maxLength="3"
                                minLength="3"
                                placeholder="CVC"
                                value={cvc}
                                onChange={handleInputChange}
                                onFocus={(e) => setFocus(e.target.name)}
                                required
                            />
                        </div>
                    </form>
                    {user ? (
                        <div className={`ComprarFinal FinalButtons `}>
                            <button onClick={handleOnClick}>Pagar ${totalPrice.toFixed(2)}</button>
                        </div>
                    ) : (
                        <div className={`ComprarFinal FinalButtons ${email.length === 0 || email !== reEmail ? 'Disabled' : ''}`}>
                            {email.length === 0 || email !== reEmail ? (
                                <button disabled onClick={handleOnClick}>Pagar ${totalPrice.toFixed(2)}</button>
                            ) : (
                                <button onClick={handleOnClick}>Pagar ${totalPrice.toFixed(2)}</button>
                            )}
                        </div>

                    )}

                </div>
            </div>
        </div >
    );
};

export default Checkout;
