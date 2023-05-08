import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, makeStyles } from '@material-ui/core';
import ItemCount from './ItemCount';
import { useCart } from '../../context/CartContext';

const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '600px',
        width: '380px',
    },
    media: {
        height: '280px',
        width: '100%',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
}));

const Cards = ({ id, name, price, category, description, size, image, stock }) => {
    const { addItem, getItemCount, isInCart } = useCart();
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
        <Card className={classes.card}>
            <CardMedia component="img" alt={name} className={classes.media} image={image} />
            <CardContent className={classes.content}>
                <div>
                    <Typography variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Talle: {size}
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                        Precio: $ {price}.-
                    </Typography>
                    
                </div>
                <div className={classes.buttonContainer}>
                    {isInCart(id) ? (
                        <Link to={`/${name}/item/${id}`} className="DontView">
                            <Button color="secondary">Detalles</Button>
                        </Link>
                    ) : (
                        <Link to={`/${name}/item/${id}`}>
                            <Button color="secondary">Detalles</Button>
                        </Link>
                    )}

                    {isInCart(id) ? (
                        <Typography variant="body2" className="ProductInCart">
                            {getItemCount(id) === 1
                                ? `${getItemCount(id)} Producto en el Carrito`
                                : `${getItemCount(id)} Productos en el Carrito`}
                        </Typography>
                    ) : (
                        <ItemCount onAdd={handleOnAdd} stock={stock} />
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default Cards;
