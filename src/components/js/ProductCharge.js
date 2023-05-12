import { db, auth, storage } from '../../Firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { makeStyles, Typography, Button } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

const useStyles = makeStyles((theme) => ({
    cardAdmin: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: theme.spacing(2),
        backgroundColor: '#fff',
        width: '380px',
        margin: '2rem',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    input: {
        marginBottom: theme.spacing(2),
        width: '100%',
        height: '40px',
        borderRadius: '4px',
        border: 'solid 0.5px #eee',
        fontSize: '1rem',
    },
    textarea: {
        marginBottom: theme.spacing(2),
        textAlign: 'left',
        width: '100%',
        verticalAlign: 'top',
        height: '120px',
        borderRadius: '4px',
        border: 'solid 0.5px #eee',
        fontSize: '1rem',
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const ProductCharge = ({ greeting }) => {
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.email === "admin@lonneopen.com") {
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
        const name = event.target.name.value.slice(0, 36);
        const description = event.target.description.value;
        const category = event.target.category.value;
        const price = event.target.price.value;
        const size = event.target.size.value;
        const stock = event.target.stock.value;

        try {
            setLoading(true);
            const storageRef = ref(storage, `img/${imageFile.name}`);
            const snapshot = await uploadBytes(storageRef, imageFile);
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
        <ThemeProvider theme={theme}>
            {authenticated ? (
                <div className={classes.cardAdmin}>
                    <Typography variant="h1" className='Mini'>{greeting}</Typography>
                    <form className="ContactForm" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre - Máximo 36 caracteres"
                            required
                            className={classes.input}
                            maxLength={36}                            
                        />
                        <input
                            type="text"
                            name="category"
                            placeholder="Categoría"
                            required
                            className={classes.input}
                            maxLength={36}
                        />
                        <textarea
                            name="description"
                            placeholder="Descripción"
                            required
                            className={`${classes.textarea}`}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Precio"
                            required
                            className={classes.input}
                        />
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            required
                            className={classes.input}
                        />
                        <input
                            type="text"
                            name="size"
                            placeholder="Talle"
                            required
                            className={classes.input}
                            maxLength={36}
                        />
                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            required
                            className={classes.input}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Cargar Producto
                        </Button>
                    </form>
                </div>
            ) : (
                <>
                    <div className="ButtonItemListDetail">
                        <button onClick={handleOnClick}>Volver</button>
                    </div>
                    <h3>No está autorizado para acceder a esta página</h3>
                </>
            )}
        </ThemeProvider>
    );
};

export default ProductCharge;