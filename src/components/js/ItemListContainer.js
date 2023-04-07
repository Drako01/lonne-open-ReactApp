import CardList from './CardList'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import logo from '../assets/icons/logo.ico'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../Firebase/firebaseConfig'



const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const { categoryId } = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true)

        const productsRef = categoryId
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products')

        getDocs(productsRef)
            .then(snapshot => {
                const productsAdapted = snapshot.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data }
                })
                setProducts(productsAdapted)
            })
            .catch(error => {
                Swal.fire("Error", error.message, "error");
            })
            .finally(() => {
                setLoading(false)
            })
    }, [categoryId])

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader2"></div>
            </div>
        )
    }
    const handleOnClick = () => {
        navigate('/itemlist');
    };
    return (
        <div>
            <div className='Logo-Icono'>
                <Link to={`/`}>
                    <img src={logo} alt='Lonne Open' />
                </Link>
            </div>

            <h1>{greeting} {categoryId}</h1>
            <CardList products={products} />
            <div className='ButtonItemListDetail Listado'>
                <button onClick={handleOnClick} >
                    Ver Listado Completo
                </button>
            </div>
        </div>
    )
}

export default ItemListContainer;