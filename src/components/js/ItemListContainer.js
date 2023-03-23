import CardList from './CardList'
import { useParams } from 'react-router-dom'
import { getProducts, getProductsByCategory } from '../../asyncProducts';
import { useEffect, useState } from 'react';


const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])

    const { categoryId } = useParams()

    useEffect(() => {
        const asyncFunction = categoryId ? getProductsByCategory : getProducts

        asyncFunction(categoryId)
            .then(products => {
                setProducts(products)
            })
            .catch(error => {
                console.log(error)
            })
    }, [categoryId])

    return (
        <div>
            <h1>{greeting}</h1>
            <CardList products={products} /> 
        </div>        
    )
}

export default ItemListContainer;