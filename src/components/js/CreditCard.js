import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCart } from '../../context/CartContext';



const CreditCardForm = () => {
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [focus, setFocus] = useState("");
    const navigate = useNavigate();
    const { clearCart } = useCart()
    const vaciarCarrito = () => {
        return clearCart();
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "number":
                if (/^[0-9\s]{0,19}$/.test(value)) setNumber(value)
                break;
            case "name":
                if (/^[a-zA-Z\s]{0,19}$/.test(value)) setName(value)
                break;
            case "expiry":
                //if (/^\d{2}\d{2}$/.test(value)) 
                setExpiry(value)
                break;
            case "cvc":
                if (/^[0-9]{0,3}$/.test(value)) setCvc(value)
                break;
            default:
                break;
        }
    };

    const handlePayment = () => {
        Swal.fire({
            title: '¡Compra exitosa!',
            text: 'Gracias por comprar en Lonne Open',
            icon: 'success',
            didClose: () => {
                vaciarCarrito();
                navigate('/');
            }
        });
    }

    return (
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
                    placeholder="Ingrese el número"
                    value={number}
                    onChange={handleInputChange}
                    onFocus={(e) => setFocus(e.target.name)}
                    required
                />
                <input
                    type="text"
                    name="name"
                    maxLength="18"
                    placeholder="Nombre del Titular"
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

                <div className="ComprarFinal">
                    <Link onClick={handlePayment}>
                        Finalizar Compra
                    </Link>
                </div>
            </form>
        </div>
    );

};

export default CreditCardForm;
