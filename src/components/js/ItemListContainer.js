import CardList from './CardList'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import logo from '../assets/icons/logo.ico'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../services/Firebase/firebaseConfig'



const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const { categoryId } = useParams()
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
            <div>
                <h1>Cargando...</h1>
            </div>
        )
    }

    return (
        <div>
            <div className='Logo-Icono'>
                <Link to={`/`}>
                    <img src={logo} alt='Lonne Open' />
                </Link>
            </div>

            <h1>{greeting} {categoryId}</h1>
            <CardList products={products} />

        </div>
    )
}

export default ItemListContainer;