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
        setQuantity(quantity);
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

    const handleOnAdd = (event) => {
        const value = event.target.value;
        setQuantity(value);
        console.log(value)
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
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className='LeftItem'>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>
                                    <td>${product.price}</td>
                                    <td>{product.size}</td>
                                    <td>
                                        <img src={product.image} alt={product.title} />
                                    </td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            max={product.stock}
                                            value={quantity}
                                            onChange={handleOnAdd}
                                        />
                                        <button className="buttonAdd" onClick={() => handleOnAddToCart(product)}>
                                            <img src={carrito} alt="carrito" />
                                        </button>
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