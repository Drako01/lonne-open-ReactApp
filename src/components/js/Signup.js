import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
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
        <div>
            <h1>Crear cuenta</h1>
            {error &&
                <p>{error}</p>
            }
            <form onSubmit={handleSignup} className="ContactForm">

                <div className="LonneInput">
                    <label htmlFor="email">Ingrese su Email</label>
                </div>
                <div className="LonneInput">
                    <input
                        type="email"
                        value={email}
                        name="email"
                        onChange={handleEmailChange}
                    />
                </div>

                <div className="LonneInput">
                    <label htmlFor="password">Ingrese su Password</label>
                </div>
                <div className="LonneInput">
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={handlePasswordChange}
                    />
                </div>

                <div className="LonneInput">
                    <label htmlFor="rePassword">Confirme su Password</label>
                </div>
                <div className="LonneInput">
                    <input
                        type="password"
                        value={rePassword}
                        name="rePassword"
                        onChange={handleRePasswordChange}
                    />
                </div>

                <div className='ComprarFinal FinalButtons'>
                    <button type="submit">Crear cuenta</button>
                </div>
            </form>
            <div className="Signup">
                <Link to={'/login'}>Ya tienes cuenta? Inicia Sesión.!</Link>
            </div>
        </div>
    );
};

export default Signup;
