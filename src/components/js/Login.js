import { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Login = ({ greeting }) => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const { login } = useAuth();
    const [, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(user.email, user.password);
            Swal.fire({
                title: "Felicitaciones!",
                text: `Bienvenido ${user.email} a Lonne Open`,
                icon: "success",
                confirmButtonColor: "var(--fourth)",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/");
            });
        } catch (error) {
            setError(error.message);
            Swal.fire("Error", 'Usuario o Contraseña Incorrecto', "error");
        }
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className='Mini'>{greeting}</h1>
                <div className="LonneInput">
                    <label htmlFor="username">Email:</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className="LonneInput">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <div className="ComprarFinal FinalButtons">
                    <button type="submit">Login</button>
                </div>
            </form>            
        </div>
    );
};

export default Login;
