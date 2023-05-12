import { db } from '../../Firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from "react";
import Swal from 'sweetalert2';
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
        margin: '8rem 0',
        [theme.breakpoints.down('sm')]: {
            width: '380px',
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
        padding: '4px',
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const Contact = ({ greeting }) => {
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

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
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit} className={classes.cardAdmin}>
                <Typography variant="h1" className='Mini'>{greeting}</Typography>
                <input
                    type="text"
                    className={classes.input}
                    placeholder="Nombre"
                    name="name"
                    required
                />
                <input
                    type="text"
                    name="lastname"
                    className={classes.input}
                    placeholder="Apellido"
                    required
                />
                <input
                    type="text"
                    name="email"
                    className={classes.input}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    className={classes.input}
                    placeholder="Teléfono"
                    required
                />
                <textarea
                    name="message"
                    className={classes.textarea}
                    placeholder="Mensaje"
                    required
                ></textarea>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                >
                    Enviar
                </Button>
            </form>
        </ThemeProvider>
    );
};

export default Contact;
