import { NavLink } from 'react-router-dom';
import CartWidget from './CartWidget'
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db,auth } from '../../Firebase/firebaseConfig';


const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.email === "admin@mail.com") {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        });
        return unsubscribe;
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
                    <NavLink to='/itemlist' ><li>Listado de Productos</li></NavLink>
                    <NavLink to='/contact' className={'delay07'}><li>Contactenos</li></NavLink>
                    {authenticated && (
                        <>
                            <NavLink className='AdminList delay08' to='/history' ><li>Historial de Compras</li></NavLink>
                            <NavLink className='AdminList delay08' to='/charge/products' ><li>Cargar Productos</li></NavLink>
                            <NavLink className='AdminList delay08' to='/admin/itemlist' ><li>Administrar Productos</li></NavLink>
                        </>
                    )}
                </nav>
            </div>
            <CartWidget />
        </section>
    )
}

export default Navbar;
