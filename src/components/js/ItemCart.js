import { Link } from 'react-router-dom';

const Item = ({ id , name, category, description, price, size, image, stock }) => {
    
    return (
        <div className="Card CardDetail" id='Item-Detail'>           

                <div>
                    <img src={image} alt={name} />
                    <div className='Dates'>
                    
                        <h2>{name}</h2> 
                        <h3>{category}</h3>
                        <p>
                            {description}
                        </p>
                        <p>
                            En Stock: {stock}
                        </p>
                        <h3>
                            Talle: {size}
                        </h3>
                        <h3 className='Price'>
                            Precio: $ {price}.-
                        </h3>
                    </div>
                </div>

                <div className='Btn'>
                <Link to={`../${name}/checkout/${id}`}>Pagar </Link>
                </div>

        </div>
    )
}

export default Item