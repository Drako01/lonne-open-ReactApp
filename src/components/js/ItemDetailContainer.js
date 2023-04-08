import ItemDetail from './ItemDetail';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import close from '../assets/icons/close.png';
import Swal from 'sweetalert2';
import { getDocs, query, orderBy, collection } from 'firebase/firestore'
import { db } from '../../Firebase/firebaseConfig'

const ItemDetailContainer = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true);

        const productsRef = collection(db, 'products');
        const productsQuery = query(productsRef, orderBy('category', 'asc'));

        getDocs(productsQuery)
            .then((snapshot) => {
                const productsData = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const productAdapted = { id: doc.id, ...data };
                    return productAdapted;
                });

                if (itemId) {
                    const selectedProduct = productsData.find(
                        (product) => product.id === itemId
                    );
                    setProduct(selectedProduct);
                } else {
                    setProduct(productsData[0]);
                }
            })
            .catch((error) => {
                Swal.fire('Error', error.message, 'error');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [itemId]);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader2"></div>
            </div>
        );
    }

    const handleOnClick = () => {
        navigate('/');
    };

    return (
        <div>
            <button onClick={handleOnClick} className='CloseItem'>
                <img src={close} alt='Close' />
            </button>
            {product ? 
            <ItemDetail {...product} /> : 
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader2"></div>
            </div>
            }
        </div>
    );
};

export default ItemDetailContainer;
