import CardList from './CardList'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import logo from '../assets/icons/logo.ico'
import Swal from 'sweetalert2';
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../Firebase/firebaseConfig'


const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('Todas')
    const { categoryId } = useParams()
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setLoading(true)

        let productsRef = collection(db, 'products')
        let productsQuery = productsRef;

        if (categoryId && categoryId !== 'Todas') {
            productsQuery = query(productsRef, where('category', '==', categoryId))
            setSelectedCategory(categoryId)
        }

        getDocs(productsQuery)
            .then(snapshot => {
                const productsAdapted = snapshot.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data }
                })
                setProducts(productsAdapted)

                const allCategories = productsAdapted.map((product) => product.category);
                const uniqueCategories = [...new Set(allCategories)];
                setCategories(uniqueCategories);
            })
            .catch(error => {
                Swal.fire("Error", error.message, "error");
            })
            .finally(() => {
                setLoading(false)
            })
    }, [categoryId])

    const handleCategoryChange = (event) => {
        const category = event.target.value
        if (category === 'Todas') {
            navigate('/')
        } else {
            navigate(`/category/${category}`)
        }
    }

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader2"></div>
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

            <h1>{greeting} {categoryId === undefined ? '' : selectedCategory} </h1>

            <div className='LonneInput CategorySelect'>
                <label htmlFor='category'>Filtrar por categoría: </label>
                <select id='category' defaultValue={categoryId || 'Todas'} onChange={handleCategoryChange}>
                    <option value="Todas">Todas</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>


            </div>

            <CardList products={products} />
            <div className='ButtonItemListDetail Listado'>
                <button onClick={() => navigate('/itemlist')}>
                    Ver Listado Completo
                </button>
            </div>
        </div>
    )
}

export default ItemListContainer;
