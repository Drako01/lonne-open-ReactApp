import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Button from "./Button";
import { useCart } from '../../context/CartContext'


const CreditCardForm = () => {
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [focus, setFocus] = useState("");
    const { clearCart } = useCart();

    const clear = clearCart

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "number":
                setNumber(value);
                break;
            case "name":
                setName(value);
                break;
            case "expiry":
                setExpiry(value);
                break;
            case "cvc":
                setCvc(value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <Cards
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focus}
            />
            <form className="CreditCardForm" action={'./checkout'} >
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
                    maxLength="30"
                    placeholder="Nombre del Titular"
                    value={name}
                    onChange={handleInputChange}
                    onFocus={(e) => setFocus(e.target.name)}
                    required
                />
                <div className="FinalDates">
                    <input
                        type="text"
                        name="expiry"
                        maxLength="4"
                        placeholder="Expiración (MM/AA)"
                        value={expiry}
                        onChange={handleInputChange}
                        onFocus={(e) => setFocus(e.target.name)}
                        required
                    />
                    <input className="CVC"
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

                <div className='ComprarFinal'>
                    <Button label={'Finalizar Compra'} type="submit" onClick={clear} />
                </div>
            </form>
        </div>
    );
};

export default CreditCardForm;
