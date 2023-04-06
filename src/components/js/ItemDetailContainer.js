import ItemDetail from './ItemDetail';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import close from '../assets/icons/close.png';
import Swal from 'sweetalert2';
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../services/Firebase/firebaseConfig' 


const ItemDetailContainer = () => {

    const navigate = useNavigate();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true)
    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true)

        const productRef = doc(db, 'products', itemId)

        getDoc(productRef)
            .then(snapshot => {
                const data = snapshot.data()
                const productAdapted = { id: snapshot.id, ...data }
                setProduct(productAdapted)
            })
            .catch(error => {
                Swal.fire("Error", error.message, "error");
            })
            .finally(() => {
                setLoading(false)
            })
    }, [itemId])

    if (loading) {
        return (
            <div>
                <h1>Cargando...</h1>
            </div>
        )
    }
    const handleOnClick = () => {
        navigate('/');
    };

    return (
        <div>
            <button onClick={handleOnClick} className='CloseItem'>
                <img src={close} alt='Close' />
            </button>
            {product ? <ItemDetail {...product} /> : <h3>Cargando...</h3>}
        </div>
    );
};

export default ItemDetailContainer;
