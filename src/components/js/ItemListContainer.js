import CardList from './CardList';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/icons/logo.ico';
import Swal from 'sweetalert2';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useCart } from '../../context/CartContext';
import Pagination from './Pagination';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(null);
    const { clearCart } = useCart();

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);


    useEffect(() => {
        setLoading(true);

        let productsRef = collection(db, 'products');
        let productsQuery = productsRef;

        if (categoryId && categoryId !== 'Todas') {
            productsQuery = query(productsRef, where('category', '==', categoryId));
            setSelectedCategory(categoryId);
        }

        getDocs(productsQuery)
            .then(snapshot => {
                const productsAdapted = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProducts(productsAdapted);

                const allCategories = productsAdapted.map(product => product.category);
                const uniqueCategories = [...new Set(allCategories)];
                setCategories(uniqueCategories);
            })
            .catch(error => {
                Swal.fire('Error', error.message, 'error');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleCategoryChange = event => {
        const category = event.target.value;
        setCurrentPage(1);
        if (category === 'Todas') {
            navigate('/');
        } else {
            navigate(`/category/${category}`);
        }
    };
    const handlePageChange = page => {
        setCurrentPage(page);
    };


    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "¿Deseas cerrar sesión?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--first)",
                cancelButtonColor: "var(--brick)",
                confirmButtonText: "Sí, cerrar sesión",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    auth.signOut();
                    localStorage.removeItem('user');
                    clearCart([])
                    setUser(null);
                }
            });

        }).catch(error => {
            Swal.fire('Error', error.message, 'error');
        });
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader2"></div>
            </div>
        );
    }
    const currentPath = window.location.pathname;
    const hideOnOtherPaths = currentPath !== "/";


    return (
        <div>
            <div className={`hide-on-other-paths ${hideOnOtherPaths ? 'hidden' : ''}`}>
                <div className="Logo-Icono">
                    <Link to={`/`}>
                        <img src={logo} alt="Lonne Open" />
                    </Link>
                </div>
                <section className="LoginName">
                    {user ? (
                        <div className='Bienvenida'>
                            <h3>Bienvenido {user.displayName || user.email}</h3>
                            <div className='ComprarFinal FinalButtons'>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <div className='ComprarFinal FinalButtons'>
                            <Link to={`/login`}
                                className="btn btn-secondary"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </section>
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

            <CardList products={currentProducts} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <div className='ButtonItemListDetail Listado'>
                <button onClick={() => navigate('/itemlist')}>
                    Ver Listado Completo
                </button>
            </div>
        </div>
    )
}

export default ItemListContainer;