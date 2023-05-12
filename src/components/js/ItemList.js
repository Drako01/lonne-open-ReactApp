import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getDoc, doc, collection, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../Firebase/firebaseConfig';
import close from '../assets/icons/close.png';

const ItemList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();
    const [product, setProduct] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [increasePercentage, setIncreasePercentage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleOnClick = () => {
        navigate('/');
    };



    const handlePriceUpdate = async (percentage, category) => {
        if (percentage < 0 || percentage === 10) {
            await Swal.fire({
                title: 'Confirmación',
                text: `Esta acción aplicará un descuento del ${discountPercentage || 10}% a los productos seleccionados. ¿Seguro que quieres continuar?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--first)',
                cancelButtonColor: 'var(--brick)',
                confirmButtonText: 'Sí, aplicar descuento'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const productsRef = collection(db, 'products');
                        const querySnapshot = await getDocs(productsRef);

                        const updatedProducts = querySnapshot.docs.map((doc) => {
                            const data = doc.data();
                            if (category === 'all' || data.category === category) {
                                const currentPrice = parseFloat(data.price);
                                const updatedPrice = (currentPrice - (currentPrice * 0.1)).toFixed(2);
                                updateDoc(doc.ref, { price: updatedPrice });
                                return { id: doc.id, ...data, price: updatedPrice };
                            } else {
                                return { id: doc.id, ...data };
                            }
                        });

                        setProducts(updatedProducts);

                        Swal.fire('Éxito', 'Precios actualizados exitosamente', 'success');
                    } catch (error) {
                        Swal.fire('Error', error.message, 'error');
                    }
                }
            });
        } else if (percentage > 0) {
            await Swal.fire({
                title: 'Confirmación',
                text: `Esta acción aplicará un aumento del ${increasePercentage}% a los productos seleccionados. ¿Seguro que quieres continuar?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--first)',
                cancelButtonColor: 'var(--brick)',
                confirmButtonText: 'Sí, aplicar aumento'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const productsRef = collection(db, 'products');
                        const querySnapshot = await getDocs(productsRef);

                        const updatedProducts = querySnapshot.docs.map((doc) => {
                            const data = doc.data();
                            if (category === 'all' || data.category === category) {
                                const currentPrice = parseFloat(data.price);
                                const updatedPrice = (currentPrice + (currentPrice * percentage / 100)).toFixed(2);
                                updateDoc(doc.ref, { price: updatedPrice });
                                return { id: doc.id, ...data, price: updatedPrice };
                            } else {
                                return { id: doc.id, ...data };
                            }
                        });

                        setProducts(updatedProducts);

                        Swal.fire('Éxito', 'Precios actualizados exitosamente', 'success');
                    } catch (error) {
                        Swal.fire('Error', error.message, 'error');
                    }
                }
            });
        }
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
    };

    const fetchCategories = async () => {
        try {
            const categoriesRef = collection(db, 'categories');
            const querySnapshot = await getDocs(categoriesRef);
            const categoriesData = querySnapshot.docs.map((doc) => doc.data());
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
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
                    setFilteredProducts(productsData);
                })
                .catch((error) => {
                    Swal.fire('Error', error.message, 'error');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [itemId]);

    useEffect(() => {
        const filterProductsByCategory = () => {
            if (selectedCategory === 'all') {
                setFilteredProducts(products);
            } else {
                const filtered = products.filter((product) => product.category === selectedCategory);
                setFilteredProducts(filtered);
            }
        };

        filterProductsByCategory();
    }, [selectedCategory, products]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.email === 'admin@lonneopen.com') {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        });
        return unsubscribe;
    }, []);

    const handleDelete = async (id) => {
        await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--first)',
            cancelButtonColor: 'var(--brick)',
            confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, 'products', id));
                    const newProduct = product.filter((item) => item.id !== id);
                    setProduct(newProduct);
                } catch (error) {
                    Swal.fire('Error', error.message, 'error');
                }
            }
        });
    };


    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="OcultoParaCelu">
            {loading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                    <div className="loader2"></div>
                </div>
            ) : (
                <section>
                    {authenticated ? (
                        <>
                            <div className="ButtonItemListDetail">
                                <button onClick={handleOnClick}>Volver</button>
                            </div>
                            <section className='Precios'>
                                <div className='Precios_01'>
                                    <div className="ButtonItemListDetail Porcentaje">
                                        <h5>Filtro por categorías </h5>
                                        <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="InputPorcentaje">
                                            <option value="all">Todos los Productos</option>
                                            {[...new Set(filteredProducts.map((product) => product.category))].map((category) => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>

                                    </div>
                                    <div className="ButtonItemListDetail Porcentaje">
                                        <h5>Todas las categorías </h5>
                                        <button onClick={() => handlePriceUpdate(-10, selectedCategory)}>Descuento del 10% a Todos los Productos</button>
                                    </div>


                                </div>
                                <div className='Precios_01'>

                                    <div className="ButtonItemListDetail Porcentaje">
                                        <input
                                            className="InputPorcentaje"
                                            type="number"
                                            value={discountPercentage}
                                            onChange={(e) => setDiscountPercentage(parseFloat(e.target.value))}
                                            placeholder="Porcentaje de descuento"
                                        />
                                        <h5>%</h5>
                                        <button onClick={() => handlePriceUpdate(-discountPercentage, selectedCategory)}> Descuento</button>
                                    </div>

                                    <div className="ButtonItemListDetail Porcentaje">
                                        <input
                                            className="InputPorcentaje"
                                            type="number"
                                            value={increasePercentage}
                                            onChange={(e) => setIncreasePercentage(parseFloat(e.target.value))}
                                            placeholder="Porcentaje de aumento"
                                        />
                                        <h5>%</h5>
                                        <button onClick={() => handlePriceUpdate(increasePercentage, selectedCategory)}> Aumento</button>
                                    </div>

                                </div>
                            </section>
                            <table className="ItemListDetail">
                                <thead>
                                    <tr>
                                        <th className="Responsive">Nombre</th>
                                        <th className="Responsive">Categoría</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th className="Responsive">Tamaño</th>
                                        <th>Foto</th>
                                        <th>Stock</th>
                                        <th>Acción</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td className="LeftItem Responsive">{product.name}</td>
                                            <td className="Responsive">{product.category}</td>
                                            <td className="LeftItem">{product.description}</td>
                                            <td>${parseFloat(product.price).toFixed(2)}</td>
                                            <td className="Responsive">{product.size}</td>
                                            <td>
                                                <img src={product.image} alt={product.title} />
                                            </td>
                                            <td>{product.stock}</td>
                                            <td>
                                                <div className="ComprarFinal FinalButtons ">
                                                    <Link to={`/${product.name}/admin/item/${product.id}`}>Editar</Link>
                                                </div>
                                            </td>
                                            <td className="EliminarItem">
                                                <div className="HistoryDeleteButton ">
                                                    <button onClick={() => handleDelete(product.id)}>
                                                        <img src={close} alt="Close" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </>
                    ) : (
                        <>
                            <div className="ButtonItemListDetail">
                                <button onClick={handleOnClick}>Volver</button>
                            </div>
                            <h3>No está autorizado para acceder a esta página</h3>
                        </>
                    )}
                </section>
            )}
        </div>
    );
};

export default ItemList;

