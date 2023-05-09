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
    const { addItem, isInCart, getItemCount } = useCart()
    const [quantity, setQuantity] = useState(0);

    const handleOnClick = () => {
        navigate('/');
    };

    const handleOnAddToCart = (product) => {
        if (quantity <= 0) {
            Swal.fire('Error', 'Ingrese una cantidad válida', 'error');
        } else if (quantity > product.stock) {
            Swal.fire('Error', `No hay suficiente stock del producto ${product.name}`, 'error');
        } else {
            addItem({ ...product, quantity });
            setQuantity(0);
            Swal.fire({
                title: 'Producto agregado al carrito',
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1200,
                timerProgressBar: true
            });
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
        setQuantity(parseInt(event.target.value));
    };

    return (
        <div className="OcultoParaCelu">
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
                                <th>Cantidad</th>
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
                                        {product.stock === 0 ? (
                                            <div className='OutStock'>
                                                <p>Producto</p><p>Agotado</p>
                                            </div>

                                        ) : (
                                            <>
                                                {
                                                    isInCart(product.id) ? (
                                                        <div className='ComprarFinal FinalButtons IsInCart'>
                                                            <button>{getItemCount(product.id)} in <img src={carrito} className="App-icono Car CarritoList " alt="icono" /></button>
                                                        </div>

                                                    ) : (
                                                        <input
                                                            className='InputCantidad'
                                                            type="number"
                                                            min="1"
                                                            max={product.stock}
                                                            placeholder='0'
                                                            onChange={handleOnAdd}
                                                        />
                                                    )
                                                }
                                            </>
                                        )}

                                    </td>

                                    <td>
                                        <div className={`ComprarFinal FinalButtons CarritoListButton ${product.stock === 0 ? 'Disabled' : ''}`}>
                                            <button className="buttonAdd" onClick={product.stock !== 0 ? () => handleOnAddToCart(product) : undefined} disabled={product.stock === 0}>
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