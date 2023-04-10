import { NavLink } from 'react-router-dom';
import CartWidget from './CartWidget'
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';


const Navbar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesArray = [];
            const querySnapshot = await getDocs(collection(db, 'products'));
            querySnapshot.forEach((doc) => {
                const category = doc.data().category;
                if (!categoriesArray.includes(category)) {
                    categoriesArray.push(category);
                }
            });
            setCategories(categoriesArray);
        };
        fetchCategories();
    }, []);


    const toggleMenu = () => {
        const liElements = document.querySelectorAll('.menu li');
        const nonNavLinkElements = Array.from(liElements).filter(
            (li) => !li.querySelector('a')
        );
        document.body.classList.toggle('open');
        nonNavLinkElements.forEach((elem) =>
            elem.addEventListener('click', () => {
                document.body.classList.remove('open');
            })
        );
    };


    return (
        <section>
            <button className='burguer' onClick={toggleMenu}></button>
            <div className='menu'>
                <nav>
                    <NavLink to='/' className={'delay00'}><li>Inicio</li></NavLink>
                    {categories.map((category, index) => (
                        <NavLink key={index} to={`/category/${category}`} className={`delay${index + 1}`}><li>{category}</li></NavLink>
                    ))}
                    <NavLink to='/contact' className={'delay07'}><li>Contactenos</li></NavLink>
                    <NavLink to='/history' className={'delay08'}><li>Historial de Compras</li></NavLink>
                </nav>
            </div>
            <CartWidget />
        </section>
    )
}

export default Navbar;
