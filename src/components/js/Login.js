import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleLogin = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("user", JSON.stringify(user));
                Swal.fire({
                    title: `Bienvenido ${user.email}`,
                    html: `Gracias entrar a nuestro Pro-Shop`,
                    icon: 'success',
                    didClose: () => {
                        navigate('/');
                    }
                });
            })
            .catch(() => {
                setError()
                Swal.fire('Error', 'Usuario o Contraseña Incorrectos', 'error');
            });
    };

    return (
        <div>
            <h1>Login</h1>
            {error &&
                <p>{error}</p>
            }
            <form onSubmit={handleLogin} className="ContactForm">

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
                    <label htmlFor="email">Ingrese su Password</label>
                </div>
                <div className="LonneInput">
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={handlePasswordChange}
                    />
                </div>

                <div className='ComprarFinal FinalButtons'>
                    <button type="submit">Iniciar sesión</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
