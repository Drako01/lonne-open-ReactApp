import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import React, { useState } from "react";
import 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../Firebase/firebaseConfig'



const Checkout = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [focus, setFocus] = useState("");

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
        };

        try {
            await addDoc(collection(db, "history"), purchase);
            Swal.fire({
                title: '¡Compra exitosa!',
                html: `Gracias por comprar en Lonne Open`,
                icon: 'success',
                didClose: () => {
                    vaciarCarrito();
                    navigate('/');
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

    return (
        <div>
            <h1 className="Mini">Checkout</h1>
            <div className='CheckOutDiv'>
                <h3>Resumen de Compra</h3>
                <table className="ItemListDetail">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((product) => (
                            <tr key={product.id}>
                                <td className='LeftItem'>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.quantity}</td>
                                <td>${product.price * product.quantity}</td>
                            </tr>
                        ))}
                        <tr className="total-row">
                            <td className='PriceProducto' colSpan="3 ">Total:</td>
                            <td className='PriceProducto'>${totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="checkout-payment CheckOutDiv">

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
                            placeholder="Número de Tarjeta"
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
                    <div className="ComprarFinal FinalButtons">
                        <button onClick={handleOnClick}>Pagar ${totalPrice}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
