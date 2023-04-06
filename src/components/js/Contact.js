const Contact = ({greeting}) => {   
    return (
        <div className="Contacto">
            <form>
             <h1 className='Mini'>{greeting}</h1>
            <div className="LonneInput">
                <label htmlFor="username">Nombre:</label>
                <input
                    type="text"
                    name="name"
                    required
                />
            </div>
            <div className="LonneInput">
                <label htmlFor="username">Apellido:</label>
                <input
                    type="text"
                    name="lastname"
                    required
                />
            </div>
            <div className="LonneInput">
                <label htmlFor="username">Email:</label>
                <input
                    type="email"
                    name="email"
                    required
                />
            </div>
            <div className="LonneInput">
                <label htmlFor="password">Teléfono:</label>
                <input
                    type="tel"
                    name="phone"
                    required
                />
            </div>
            <div className="LonneInput">
                <label htmlFor="password">Teléfono:</label>
                <textarea                    
                    name="messaje"
                    required
                />
            </div>
            <div className="ComprarFinal FinalButtons">
                <button type="submit">Login</button>
            </div>
        </form>           
        </div>
    );
};

export default Contact;
