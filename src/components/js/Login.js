

const Login = ({ greeting }) => {
    
    return (
        <form>
             <h1 className='Mini'>{greeting}</h1>
            <div className="LonneInput">
                <label htmlFor="username">Email:</label>
                <input
                    type="email"
                    name="email"
                    required
                />
            </div>
            <div className="LonneInput">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    required
                />
            </div>
            <div className="ComprarFinal FinalButtons">
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default Login;
