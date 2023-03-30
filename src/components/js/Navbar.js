import { NavLink } from 'react-router-dom';
import CartWidget from './CartWidget'


const Navbar = () => {
    const toggleMenu = () => {
        document.body.classList.toggle('open')
    }

    return (

        <section>
            <button className='burguer' onClick={toggleMenu}></button>
            <div className='menu'>
                <nav>
                    <NavLink to='/' className={'delay00'}><li>Inicio</li></NavLink>
                    <NavLink to='/category/Raquetas' className={'delay01'}><li>Raquetas</li></NavLink>
                    <NavLink to='/category/Tubos' className={'delay02'}><li>Tubos</li></NavLink>
                    <NavLink to='/category/Zapatillas' className={'delay03'}><li>Zapatillas</li></NavLink>
                    <NavLink to='/category/Remeras' className={'delay04'}><li>Remeras</li></NavLink>
                    <NavLink to='/category/Munequeras' className={'delay05'}><li>Muñequeras</li></NavLink>
                    <NavLink to='/category/Vinchas' className={'delay06'}><li>Vinchas</li></NavLink>                    
                </nav>                
            </div>
            <CartWidget />
        </section>
    )
}

export default Navbar;