const Contact = ({ greeting }) => {
    return (
        <div className="Contacto">
            <h1 className='Mini'>{greeting}</h1>
            <form className="ContactForm">
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
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    );
};

export default Contact;
