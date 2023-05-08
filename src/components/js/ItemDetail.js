import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import ItemCount from './ItemCount';
import { useCart } from '../../context/CartContext';
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
    cardDetail: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: theme.spacing(2),
        backgroundColor: '#fff',
        [theme.breakpoints.down('sm')]: {
            width: '340px',
            height: '100%',
        },
    },
    image: {
        width: '380px',
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    dates: {
        marginBottom: theme.spacing(2),
    },
    price: {
        fontWeight: 'bold',
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

const ItemDetail = ({ id, name, category, description, price, size, image, stock }) => {
    const { addItem, isInCart } = useCart();
    const classes = useStyles();

    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id,
            name,
            price,
            category,
            description,
            size,
            image,
            stock,
            quantity,
        };
        addItem(productToAdd);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.cardDetail}>
                <img src={image} alt={name} className={classes.image} />
                <div className={classes.dates}>
                    <Typography variant="h4" component="h2" style={{ color: '#333' }}>
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" align="left">
                        {category}
                    </Typography>
                    <Typography variant="body2" align="left" style={{ color: '#333' }}>
                        {description}
                    </Typography>
                    <Typography variant="body2" align="left" style={{ color: '#333' }}>
                        En Stock: {stock}
                    </Typography>
                    <Typography variant="subtitle1" align="left" style={{ color: '#333' }}>
                        Talle: {size}
                    </Typography>
                    <Typography variant="h6" className={classes.price} align="left" style={{ color: '#333' }}>
                        Precio: $ {price}.-
                    </Typography>
                </div>
                <div>
                    {isInCart(id) ? (
                        <Link to="/cart" className={classes.button}>
                            <Typography variant="button" color="primary" className={classes.payButton}>
                                Pagar
                            </Typography>
                        </Link>
                    ) : (
                        <ItemCount onAdd={handleOnAdd} stock={stock} />
                    )}
                </div>
            </div>
        </ThemeProvider>
    );
};

export default ItemDetail;
