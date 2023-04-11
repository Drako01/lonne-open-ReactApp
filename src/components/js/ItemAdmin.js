import { db } from '../../Firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import Swal from 'sweetalert2';

const ItemAdmin = ({ id, name, category, description, image , size, price, stock }) => {
    const [newName, setName] = useState(name);
    const [newCategory, setCategory] = useState(category);
    const [newDescription, setDescription] = useState(description);
    const [newPrice, setPrice] = useState(price);
    const [newSize, setSize] = useState(size);
    const [newStock, setStock] = useState(stock);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };
    const handleStockChange = (event) => {
        setStock(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const productRef = doc(db, "products", id);
        const updatedProduct = {
            name: newName,
            category: newCategory,
            description: newDescription,
            price: newPrice,
            size: newSize,
            stock: newStock
        };

        try {
            await updateDoc(productRef, updatedProduct);
            Swal.fire('Éxito', 'Datos guardados en Firestore', 'success');
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    return (
        <div className="Card CardDetail CardAdmin" id='Item-Detail'>
            <form className="ContactForm" onSubmit={handleSubmit}>
                <div>
                    <img src={image} alt={name} />
                    <div className='DatesAdmin'>
                        <h3>Nombre: </h3>
                        <div className="LonneInput"><input type='text' value={newName} onChange={handleNameChange} /></div>
                        <h3>Categoria: </h3>
                        <div className="LonneInput"><input type='text' value={newCategory} onChange={handleCategoryChange} /></div>
                        <h3>Descripcion: </h3>
                        <div className="LonneInput"><textarea value={newDescription} onChange={handleDescriptionChange} /></div>
                        <h3>Stock: </h3>
                        <div className="LonneInput"><input type='number' value={newStock} onChange={handleStockChange} /></div>
                        <h3>Talle:</h3>
                        <div className="LonneInput"><input type='text' value={newSize} onChange={handleSizeChange} /></div>
                        <h3>Precio: $ </h3>
                        <div className="LonneInput"><input type='number' value={newPrice} onChange={handlePriceChange} /></div>
                    </div>
                </div>

                <div className='ComprarFinal BotonAdmin'>
                    <button type='submit'>
                        Continuar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ItemAdmin;
