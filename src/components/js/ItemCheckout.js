const Item = ({ id, name, category, description, price, size, image, stock }) => {

    return (
        <section>
            <h1>Felicitaciones</h1>
            <h2 style={{ textAlign: 'center'}}>Usted Compro {name}</h2>
            <div className="Card CardDetail" id='Item-Detail'>

                <div>
                    <img src={image} alt={name} />
                    <div className='Dates'>

                        <h2>{name}</h2>
                        <h3>{category}</h3>
                        <p>
                            {description}
                        </p>
                        <h3>
                            Talle: {size}
                        </h3>
                        <h3 className='Price'>
                            Precio: $ {price}.-
                        </h3>
                    </div>
                </div>
                <div>
                    <img className='Donald' src='/img/donald-duck.gif' alt='Pato Donald'/>
                </div>

            </div>
        </section>

    )
}

export default Item