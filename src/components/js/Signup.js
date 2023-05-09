import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { makeStyles, Typography, Button, TextField } from '@material-ui/core';
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
        padding: theme.spacing(3),
        backgroundColor: '#fff',
        width: '380px',
        margin: '1rem',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    input: {
        marginBottom: theme.spacing(2),
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const Signup = () => {
    const classes = useStyles();
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleRePasswordChange = (event) => setRePassword(event.target.value);


    const handleSignup = (event) => {
        event.preventDefault();
        if (password !== rePassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("user", JSON.stringify(user));
                Swal.fire({
                    title: `Cuenta creada para ${user.email}`,
                    html: `Gracias por registrarse en nuestro Pro-Shop`,
                    icon: 'success',
                    didClose: () => {
                        navigate('/');
                    }
                });
            })
            .catch((error) => {
                setError(error.message);
                Swal.fire('Error', error.message, 'error');
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Typography variant="h1" className="Mini">Crear cuenta</Typography>
                {error &&
                    <Typography variant="body1">{error}</Typography>
                }
                <form onSubmit={handleSignup} className={classes.cardAdmin}>
                    <TextField
                        type="email"
                        value={email}
                        name="email"
                        className={classes.input}
                        onChange={handleEmailChange}
                        label="Ingrese su Email"
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        type="password"
                        value={password}
                        name="password"
                        className={classes.input}
                        onChange={handlePasswordChange}
                        label="Ingrese su Password"
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        type="password"
                        value={rePassword}
                        name="rePassword"
                        className={classes.input}
                        onChange={handleRePasswordChange}
                        label="Confirme su Password"
                        variant="outlined"
                        fullWidth
                    />

                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Crear cuenta
                    </Button>

                    <Typography variant="body1">
                        Ya tienes cuenta? <RouterLink to="/login">Inicia Sesión.</RouterLink>
                    </Typography>
                </form>
            </div>
        </ThemeProvider>
    );
};


export default Signup;