import CardList from './CardList'
import { useParams } from 'react-router-dom'
import { getProducts, getProductsByCategory } from '../../asyncMock';
import { useEffect, useState } from 'react';
import logo  from '../assets/icons/logo.ico'


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
            <div className='Logo-Icono'>
                <img src={logo} alt='Lonne Open'/>
            </div>
            
            <h1>{greeting} {categoryId}</h1>
            <CardList products={products} /> 
            
        </div>        
    )
}

export default ItemListContainer;