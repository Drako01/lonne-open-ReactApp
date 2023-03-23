import Item from './Item'
import { getProductById } from '../../asyncProducts';
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
            <Item {...products} /> 
        </div>        
    )
}


export default ItemDetailContainer;