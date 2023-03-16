import CardList from './CardList'
import { getProducts } from '../../asyncProducts';
import { useEffect, useState } from 'react';


const CardsPanel = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
            .then(products => {
                setProducts(products)
            })
    }, [])

    return (
        <div>
            <CardList products={products} /> 
        </div>        
    )
}

export default CardsPanel;