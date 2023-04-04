import Item from './Item';
import { getProductById } from '../../asyncMock';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import close from '../assets/icons/close.png';
import swal from 'sweetalert';

const ItemDetailContainer = () => {

    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const { itemId } = useParams();

    useEffect(() => {
        getProductById(itemId)
            .then(response => {
                setProduct(response);
            })
            .catch(error => {
                swal("Error", error.message, "error");
            });
    }, [itemId]);

    const handleOnClick = () => {
        navigate('/');
    };

    return (
        <div>
            <button onClick={handleOnClick} className='CloseItem'>
                <img src={close} alt='Close' />
            </button>
            {product ? <Item {...product} /> : <h3>Cargando...</h3>}
        </div>
    );
};

export default ItemDetailContainer;
