import Item from './Item'
import { getProductById } from '../../asyncMock';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import close from '../assets/icons/close.png'
import { useNavigate } from 'react-router-dom';



const ItemDetailContainer = () => {
    const [products, setProduct] = useState()
    const navigate = useNavigate();
    const { itemId } = useParams()

    const handleOnClick = () => {
        navigate('/');
    }
    
    useEffect(() => {
        getProductById(itemId).then(response => {
            setProduct(response)
        }).catch(error => {
            console.log(error)
        })
    }, [itemId])

    return (
        <div>
            <button onClick={handleOnClick} className='CloseItem'>
                <img src={close} alt='Close' />
            </button>
            <Item {...products} />
        </div>
    )
}


export default ItemDetailContainer;