import whatsapp from '../assets/icons/whatsapp.svg';
import instagram from '../assets/icons/instagram.svg';
import facebook from '../assets/icons/facebook.svg';
import WhatsAppButton from './WhatsAppButton';
import logo from '../assets/icons/logo.ico'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { db, auth } from '../../Firebase/firebaseConfig';
import Swal from 'sweetalert2';
import { useCart } from '../../context/CartContext';


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
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const { clearCart } = useCart();

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
        const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
            if (authenticatedUser) {
                setAuthenticated(true);
                setUser(authenticatedUser);
            } else {
                setAuthenticated(false);
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);



    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "¿Deseas cerrar sesión?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--first)",
                cancelButtonColor: "var(--brick)",
                confirmButtonText: "Sí, cerrar sesión",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    auth.signOut();
                    clearCart([])
                    setUser(null);
                }
            });

        }).catch(error => {
            Swal.fire('Error', error.message, 'error');
        });
    };

    return (
        <div className="Footer oculto-impresion">
            <footer className='Top'>
                <img src={logo} alt='Lonne Open' />
                <section className='Links'>
                    <div>
                        <NavLink to='/'><li>Inicio</li></NavLink>
                        <NavLink to='/itemlist' ><li>Listado de Productos</li></NavLink>
                        <NavLink to='/contact' ><li>Contactenos</li></NavLink>
                        <div className='Line'></div>

                        {authenticated ? (
                            <>
                                <NavLink className='Gold'>Bienvenido <span>{user.email}</span></NavLink>
                                <NavLink to='/myhistory' className={'delay08'}><li>Mi Historial de Compras</li></NavLink>
                                <NavLink onClick={handleLogout}>Logout</NavLink>
                                <div className='Line'></div>
                                {authenticated && user.email === "admin@mail.com" && (
                                    <>
                                        <NavLink to='/history' className={'delay08'}><li>Historial de Compras</li></NavLink>
                                        <NavLink to='/charge/products' ><li>Cargar Productos</li></NavLink>
                                        <NavLink to='/admin/itemlist' ><li>Administrar Productos</li></NavLink>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <NavLink to='/login'>
                                    <li>Login</li>
                                </NavLink>
                            </>
                        )}

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