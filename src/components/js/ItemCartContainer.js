import ItemCart from './ItemCart'
import { getProductById } from '../../asyncMock';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ItemDetailContainer = () => {
    const [products, setProduct] = useState()

    const { itemId } = useParams()


    useEffect(() => {
        getProductById(itemId).then(response => {
            setProduct(response)
        }).catch(error => {
            console.log(error)
        })
    }, [itemId])

    return (
        <div>
            <ItemCart {...products} /> 
        </div>        
    )
}


export default ItemDetailContainer;