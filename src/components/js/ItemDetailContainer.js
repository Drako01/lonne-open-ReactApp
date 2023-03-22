import Item from './Item'
import { getProducts } from '../../asyncProducts';
import { useEffect, useState } from 'react';


const ItemDetailContainer = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
            .then(products => {
                setProducts(products)
            })
    }, [])

    return (
        <div>
            <Item {...products[9]} /> 
        </div>        
    )
}


export default ItemDetailContainer;