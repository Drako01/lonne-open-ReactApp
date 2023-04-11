import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';
import LoginPage from './LoginPage';


<LoginPage />


const ItemList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();
    

    const handleOnClick = () => {
        navigate('/');
    };


    useEffect(() => {
        setLoading(true);

        if (itemId) {
            const productRef = doc(db, 'products', itemId);

            getDoc(productRef)
                .then((snapshot) => {
                    const data = snapshot.data();
                    const productAdapted = { id: snapshot.id, ...data };
                    productAdapted.quantity = 1;
                    setProducts([productAdapted]);
                })
                .catch((error) => {
                    Swal.fire('Error', error.message, 'error');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            const productsRef = collection(db, 'products');

            getDocs(productsRef)
                .then((snapshot) => {
                    const productsData = snapshot.docs.map((doc) => {
                        const data = doc.data();
                        const productAdapted = { id: doc.id, ...data };
                        productAdapted.quantity = 1;
                        return productAdapted;
                    }).sort((a, b) => a.category.localeCompare(b.category));
                    setProducts(productsData);
                })
                .catch((error) => {
                    Swal.fire('Error', error.message, 'error');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [itemId]);


    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    if (!loggedIn) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <div>
            {loading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                    <div className="loader2"></div>
                </div>
            ) : (
                <section>
                    <div className="ButtonItemListDetail">
                        <button onClick={handleOnClick}>Volver</button>
                    </div>
                    <table className="ItemListDetail">
                        <thead>
                            <tr>
                                <th className='Responsive'>Nombre</th>
                                <th className='Responsive'>Categoria</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th className='Responsive'>Size</th>
                                <th>Foto</th>
                                <th>Stock</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className='LeftItem Responsive'>{product.name}</td>
                                    <td className='Responsive'>{product.category}</td>
                                    <td className='LeftItem'>{product.description}</td>
                                    <td>${product.price}</td>
                                    <td className='Responsive'>{product.size}</td>
                                    <td>
                                        <img src={product.image} alt={product.title} />
                                    </td>
                                    <td>{product.stock}</td>


                                    <td>
                                        <div className='ComprarFinal FinalButtons '>
                                        <Link to={`/${product.name}/admin/item/${product.id}`}>Editar</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
        </div>
    );
};

export default ItemList;