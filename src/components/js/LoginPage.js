import { useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



const LoginPage = ({ onLogin }) => {
    const [password, setPassword] = useState("");
    const [attempts, setAttempts] = useState(0);
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();

        if (password === "Admin123") {
            onLogin();
        } else {
            setAttempts(attempts + 1);
            if (attempts >= 2) {
                navigate('/');
            } else {
                Swal.fire('Error', 'Contraseña Incorrecta', 'error');
            }
        }
    };

    return (
        <div className="Contacto">
            <form onSubmit={handleSubmit} className="ContactForm">
                <div className="LonneInput">
                    <label htmlFor="password">Ingrese la Contraseña de Administración:</label>
                </div>
                <div className="LonneInput">
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <div className='ComprarFinal FinalButtons'>
                    <button type="submit">Iniciar sesión</button>
                </div>

            </form>
        </div>
    );
};


export default LoginPage