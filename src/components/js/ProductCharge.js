import { db, auth, storage } from '../../Firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';



const ProductCharge = ({ greeting }) => {
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.email === "admin@mail.com") {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        });
        return unsubscribe;
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const imageFile = event.target.image.files[0];
        const name = event.target.name.value;
        const description = event.target.description.value;
        const category = event.target.category.value;
        const price = event.target.price.value;
        const size = event.target.size.value;
        const stock = event.target.stock.value;
    
        try {
            setLoading(true);
    
            // Create a storage reference with a unique filename
            const storageRef = ref(storage, `img/${imageFile.name}`);
    
            // Upload the image file to Firebase Storage
            const snapshot = await uploadBytes(storageRef, imageFile);
    
            // Get the download URL of the uploaded image
            const imageUrl = await getDownloadURL(snapshot.ref);
    
            const products = {
                name,
                description,
                category,
                price,
                size,
                image: imageUrl,
                stock,
            };
    
            const productsCollection = collection(db, "products");
            await addDoc(productsCollection, products);
            Swal.fire('Éxito', 'Datos guardados en Firestore', 'success');
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };
    

    const handleOnClick = () => {
        navigate('/');
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

        (authenticated) ? (
            <>
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
                            <label htmlFor="image">Imagen:</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
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
            </>) : (
            <>
                <div className="ButtonItemListDetail">
                    <button onClick={handleOnClick}>Volver</button>
                </div>
                <h3>No esta Autorizado para acceder a esta Página</h3>
            </>
        )


    );
};

export default ProductCharge;
