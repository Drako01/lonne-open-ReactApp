import Item from './Item'
import { getProductById } from '../../asyncMock';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import close from '../assets/icons/close.png'
import { useNavigate } from 'react-router-dom';



const ItemDetailContainer = () => {

    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/');
    }

    const [products, setProduct] = useState(null);
    const { itemId } = useParams()

    useEffect(() => {
        getProductById(itemId)
            .then(response => {
                setProduct(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, [itemId]);

    return (
        <div>
            <button onClick={handleOnClick} className='CloseItem'>
                <img src={close} alt='Close' />
            </button>
            {products ? <Item {...products} /> : <p>Cargando...</p>}
        </div>
    )
}


export default ItemDetailContainer;