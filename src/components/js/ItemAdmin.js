import React, { useState } from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../Firebase/firebaseConfig';
import { updateDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';
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
    image: {
        width: '100%',
        height: '180px',
        marginBottom: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        objectFit: 'contain',
    },
    datesAdmin: {
        marginBottom: theme.spacing(2),
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
    payButton: {
        padding: theme.spacing(1, 2),
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: '4px',
        textDecoration: 'none',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#333',
        },
    },
}));

const ItemAdmin = ({
    id,
    name,
    category,
    description,
    image,
    size,
    price,
    stock,
}) => {
    const [newName, setName] = useState(name);
    const [newCategory, setCategory] = useState(category);
    const [newDescription, setDescription] = useState(description);
    const [newPrice, setPrice] = useState(price);
    const [newSize, setSize] = useState(size);
    const [newStock, setStock] = useState(stock);
    const navigate = useNavigate();
    const [newImageFile, setImageFile] = useState(null);
    const classes = useStyles();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };
    const handleStockChange = (event) => {
        setStock(event.target.value);
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const productRef = doc(db, 'products', id);
        const updatedProduct = {
            name: newName,
            category: newCategory,
            description: newDescription,
            price: newPrice,
            size: newSize,
            stock: newStock,
        };

        try {
            if (newImageFile) {
                const storageRef = ref(storage, `${id}/${newImageFile.name}`);
                await uploadBytes(storageRef, newImageFile);
                const downloadURL = await getDownloadURL(storageRef);
                updatedProduct.image = downloadURL;
            }

            await updateDoc(productRef, updatedProduct);

            Swal.fire({
                icon: 'success',
                title: 'Producto Modificado con éxito',
                showConfirmButton: false,
                timer: 1500,
            });

            navigate('/admin/itemlist');
        } catch (error) {
            console.error('Error modificando el producto:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error modificando el producto',
            });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit} className={classes.cardAdmin}>
                <Typography variant="h1" className='Mini'>Modificar Producto</Typography>
                <img src={image} alt={name} className={classes.image} />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={classes.input}
                />
                <input
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                    className={classes.input}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    value={newCategory}
                    onChange={handleCategoryChange}
                    className={classes.input}
                    placeholder="Category"
                    required
                />
                <textarea
                    type="text"
                    value={newDescription}
                    onChange={handleDescriptionChange}
                    className={`${classes.textarea}`}
                    placeholder="Description"
                    required
                />
                <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPrice}
                    onChange={handlePriceChange}
                    className={classes.input}
                    placeholder="Price"
                    required
                />
                <input
                    type="text"
                    value={newSize}
                    onChange={handleSizeChange}
                    className={classes.input}
                    placeholder="Size"
                    required
                />
                <input
                    type="number"
                    min="0"
                    step="1"
                    value={newStock}
                    onChange={handleStockChange}
                    className={classes.input}
                    placeholder="Stock"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Modificar
                </Button>
            </form>
        </ThemeProvider>
    );
};

export default ItemAdmin;
