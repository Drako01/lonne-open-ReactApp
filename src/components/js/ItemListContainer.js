import CardList from './CardList'
import { useParams } from 'react-router-dom'
import { getProducts, getProductsByCategory } from '../../asyncMock';
import { useEffect, useState } from 'react';
import logo  from '../assets/icons/logo.ico'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


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
                Swal.fire("Error", error.message, "error");
            })
    }, [categoryId])

    return (
        <div>
            <div className='Logo-Icono'>
                <Link  to={`/`}>
                    <img src={logo} alt='Lonne Open'/>
                </Link>                
            </div>
            
            <h1>{greeting} {categoryId}</h1>
            <CardList products={products} /> 
            
        </div>        
    )
}

export default ItemListContainer;