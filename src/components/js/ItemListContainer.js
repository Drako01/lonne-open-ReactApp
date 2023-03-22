import CardList from './CardList'
import { getProducts } from '../../asyncProducts';
import { useEffect, useState } from 'react';


const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
            .then(products => {
                setProducts(products)
            })
    }, [])

    return (
        <div>
            <h1>{greeting}</h1>
            <CardList products={products} /> 
        </div>        
    )
}

export default ItemListContainer;