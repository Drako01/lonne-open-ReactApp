import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getDoc, doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';
import close from '../assets/icons/close.png'



const ItemList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();
    const [product, setProduct] = useState([]);


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


    const handleDelete = async (id, numTries = 0) => {
        const maxTries = 3;
        const correctPass = 'Admin123';

        const { value: password, dismiss: cancel } = await Swal.fire({
            title: 'Ingresa la contraseña',
            input: 'password',
            inputPlaceholder: 'Ingresa la contraseña aquí...',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: (pass) => {
                if (pass === '') {
                    Swal.showValidationMessage('Ingresa una contraseña para verificar tu nivel de autorización.');
                }
            }
        });

        if (cancel) {
            return;
        }

        if (password === correctPass) {
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
                        await deleteDoc(doc(db, "products", id));
                        const newProduct = product.filter((item) => item.id !== id);
                        setProduct(newProduct);
                    } catch (error) {
                        Swal.fire('Error', error.message, 'error');
                    }
                }
            });
        } else if (password !== '') {
            numTries++;
            if (numTries < maxTries) {
                Swal.fire({
                    title: 'Contraseña incorrecta',
                    text: `Te quedan ${maxTries - numTries} intentos. Por favor, ingresa la contraseña correcta.`,
                    icon: 'error',
                }).then(() => {
                    handleDelete(id, numTries);
                });
            } else {
                Swal.fire({
                    title: 'Número máximo de intentos alcanzado',
                    text: 'Has alcanzado el número máximo de intentos permitidos. No se puede continuar.',
                    icon: 'error',
                });
            }
        }
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
                                <th className='Responsive'>Nombre</th>
                                <th className='Responsive'>Categoria</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th className='Responsive'>Size</th>
                                <th>Foto</th>
                                <th>Stock</th>
                                <th>Acción</th>
                                <th>Eliminar</th>
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
                                    <td className='EliminarItem'>
                                        <div className='HistoryDeleteButton '>
                                            <button onClick={() => handleDelete(product.id)}>
                                                <img src={close} alt='Close' />
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

export default ItemList;