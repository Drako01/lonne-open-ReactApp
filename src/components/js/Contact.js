import { db } from '../../Firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from "react";
import Swal from 'sweetalert2';


const Contact = ({ greeting }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const lastname = event.target.lastname.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const message = event.target.message.value;

        const contacto = {
            name,
            lastname,
            email,
            phone,
            message,
        };

        try {
            setLoading(true);
            const contactsCollection = collection(db, "contacts");
            await addDoc(contactsCollection, contacto);
            
            Swal.fire('Éxito', 'Datos guardados en Firestore', 'success');
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader2"></div>
            </div>
        );
    }
    return (
        <div className="Contacto">
            <h1 className='Mini'>{greeting}</h1>
            <form className="ContactForm" onSubmit={handleSubmit}>
                <div className="LonneInput">
                    <label htmlFor="username">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        required
                    />
                </div>
                <div className="LonneInput">
                    <label htmlFor="username">Apellido:</label>
                    <input
                        type="text"
                        name="lastname"
                        required
                    />
                </div>
                <div className="LonneInput">
                    <label htmlFor="username">Email:</label>
                    <input
                        type="email"
                        name="email"
                        required
                    />
                </div>
                <div className="LonneInput">
                    <label htmlFor="password">Teléfono:</label>
                    <input
                        type="tel"
                        name="phone"
                        required
                    />
                </div>
                <div className="LonneInput">
                    <label htmlFor="password">Mensaje:</label>
                    <textarea
                        name="message"
                        required
                    />
                </div>
                <div className="ComprarFinal FinalButtons">
                    <button
                        type="submit">
                        Enviar
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Contact;
