import whatsapp from '../assets/icons/whatsapp.svg';
import instagram from '../assets/icons/instagram.svg';
import facebook from '../assets/icons/facebook.svg';
import WhatsAppButton from './WhatsAppButton';
import logo from '../assets/icons/logo.ico'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';


const Footer = () => {
    const mensajeWhatsApp = () => {
        window.open("https://wa.me/5492257548207?text=Hola!%20Me%20gustaría%20tener%20información%20sobre%20los%20servicios%20que%20ofrecen.!")
    }
    const mensajeInstagram = () => {
        window.open("https://www.instagram.com/lonneopentenis/?hl=es")
    }
    const mensajeFacebook = () => {
        window.open("https://www.facebook.com/people/Lonn%C3%A9-Open-Tenis/100063638766614/?locale=es_LA")
    }
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

    return (
        <div className="Footer oculto-impresion">
            <footer className='Top oculto-impresion'>
                <img src={logo} alt='Lonne Open' />
                <section className='Links'>
                    <div>
                        <NavLink to='/'><li>Inicio</li></NavLink>
                        <NavLink to='/itemlist' ><li>Listado de Productos</li></NavLink>
                        <NavLink to='/history' className={'delay08'}><li>Historial de Compras</li></NavLink>
                        <NavLink to='/contact' ><li>Contactenos</li></NavLink>
                        <NavLink to='/charge/products' ><li>Cargar Productos</li></NavLink>
                    </div>
                    <div>
                        {categories.map((category, index) => (
                            <NavLink key={index} to={`/category/${category}`} className={`delay${index + 1}`}><li>{category}</li></NavLink>
                        ))}
                    </div>
                </section>
            </footer>
            <footer className='Bottom'>
                <div className='Legal'>
                    <p>
                        &copy; Alejandro Di Stefano | Entrega Final | Curso de React en CoderHouse | Comisión #39610
                    </p>
                </div>
                <section className='Iconos-social Links'>
                    <img src={whatsapp} alt="icono" onClick={mensajeWhatsApp} />
                    <img src={instagram} alt="icono" onClick={mensajeInstagram} />
                    <img src={facebook} alt="icono" onClick={mensajeFacebook} />
                </section>
            </footer>
            <WhatsAppButton />
        </div>
    )
}

export default Footer;