import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';
import { useCart } from '../../context/CartContext'
import carrito from '../assets/icons/carro.png';

const ItemListDetail = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);


    const handleOnClick = () => {
        navigate('/');
    };

    const handleOnAddToCart = (product) => {
        addItem({ ...product, quantity });
        setQuantity(product.quantity);
        Swal.fire(`El Producto ${product.name} fue agregado al carrito`, '', 'success');
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

    const handleOnQuantityChange = (e, productId) => {
        const value = parseInt(e.target.value) || 1;
        setProducts(prevState => prevState.map(product => {
            if (product.id === productId) {
                return { ...product, quantity: value };
            } else {
                return product;
            }
        }));
    };

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
                                <th>Nombre</th>
                                <th>Categoria</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Size</th>
                                <th>Foto</th>
                                <th>Stock</th>
                                <th>Cantidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(products).map((producto) => (
                                <tr key={producto.id}>
                                    <td className='LeftItem'>{producto.name}</td>
                                    <td>{producto.category}</td>
                                    <td>{producto.description}</td>
                                    <td>${producto.price}</td>
                                    <td>{producto.size}</td>
                                    <td>
                                        <img src={producto.image} alt={producto.title} />
                                    </td>
                                    <td>{producto.stock}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            max={producto.stock}
                                            onChange={(e) => handleOnQuantityChange(e, producto.id)}
                                            value={producto.quantity}

                                        />
                                    </td>
                                    <td>
                                        <div className='ComprarFinal FinalButtons CarritoListButton'>
                                            <button
                                                type="submit"
                                                onClick={() => handleOnAddToCart({ ...producto, quantity })}
                                            >
                                                <img src={carrito} className="App-icono Car CarritoList" alt="icono" />
                                            </button>
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

export default ItemListDetail;
