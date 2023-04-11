import { db } from '../../Firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from "react";
import Swal from 'sweetalert2';
import LoginPage from './LoginPage';

<LoginPage />
const ProductCharge = ({ greeting }) => {
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);


    const handleLogin = () => {
        setLoggedIn(true);
    };

    if (!loggedIn) {
        return <LoginPage onLogin={handleLogin} />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const description = event.target.description.value;
        const category = event.target.category.value;
        const price = event.target.price.value;
        const size = event.target.size.value;
        const imagenName = event.target.imagenName.value;
        const stock = event.target.stock.value;

        const products = {
            name,
            description,
            category,
            price,
            size,
            image: `/img/${imagenName}`,
            stock,
        };

        try {
            setLoading(true);
            const productsCollection = collection(db, "products");
            await addDoc(productsCollection, products);
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
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        required
                    />
                </div>
                <div className="LonneInput">
                    <label htmlFor="username">Categoría:</label>
                    <input
                        type="text"
                        name="category"
                        required
                    />
                </div>
                <div className="LonneInput">
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        name="description"
                        required
                    />
                </div>
                <div className="LonneInput">
                    <label htmlFor="password">Precio:</label>
                    <input
                        type="number"
                        name="price"
                        required
                    />
                </div>

                <div className="LonneInput">
                    <label htmlFor="password">Direccón de la Imágen:</label>
                    <input
                        type="text"
                        name="imagenName"
                        required
                    />
                </div>
                <div className="LonneInput">
                    <label htmlFor="password">Talle:</label>
                    <input
                        type="text"
                        name="size"
                        required
                    />
                </div>
                <div className="LonneInput">
                    <label htmlFor="password">Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        required
                    />
                </div>
                <div className="ComprarFinal FinalButtons">
                    <button
                        type="submit">
                        Cargar Producto
                    </button>
                </div>
            </form>

        </div>
    );
};

export default ProductCharge;
