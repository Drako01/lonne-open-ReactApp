import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Link, useSubmit } from 'react-router-dom';

const CreditCardForm = () => {
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [focus, setFocus] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "number":
                if (/^[0-9\s]{0,19}$/.test(value)) {
                    setNumber(value);
                }
                break;
            case "name":
                if (/^[a-zA-Z\s]{0,19}$/.test(value)) {
                    setName(value);
                }
                break;
            case "expiry":

                setExpiry(value);

                break;
            case "cvc":
                if (/^[0-9]{0,3}$/.test(value)) {
                    setCvc(value);
                }
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
            <form className="CreditCardForm" action={"./checkout"}>
                <input
                    type="tel"
                    name="number"
                    maxLength="16"
                    placeholder="Ingrese el número"
                    value={number}
                    onChange={handleInputChange}
                    onFocus={(e) => setFocus(e.target.name)}
                    pattern="[0-9\s]{13,19}"
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
                    pattern="[a-zA-Z\s]+"
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
                        pattern="^(0[1-9]|1[0-2])\/\d{2}$"
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
                        pattern="[0-9]{3}"
                        required
                    />
                </div>

                <div className="ComprarFinal">
                    <Link to={"../checkout"} onClick={useSubmit}>
                        Finalizar Compra
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CreditCardForm;
