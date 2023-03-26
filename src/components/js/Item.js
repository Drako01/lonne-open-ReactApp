import Button from './Button';
import Like from './IsLike';

const Item = ({ id , name, category, description, price, size, image, stock }) => {
    const comprar = () => {
        console.log(`Compre el Producto con Id: ${id} y se llama ${description} ${name} a un Valor de: $${price}.-`)
    }
    
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
                    <Like />
                    <Button label='Comprar' callback={comprar}/>
                </div>

        </div>
    )
}

export default Item