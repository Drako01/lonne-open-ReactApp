import buscar from '../assets/icons/busqueda.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react'
import CartWidget from './CartWidget'
import Favorites from './Favorites'
import Messajes from './Messajes';


const Navbar = () => {
    const toggleMenu = () => {
        document.body.classList.toggle('open')
    }
    const Counter = () => {
        const [count, setCount] = useState(0)
        const [fav, setFav] = useState(0)
        const [mje, setMje] = useState(0)

        const increment = () => {
            setCount(prev => prev + 1)
            console.log(`El carrito tiene ${count + 1} items`)
        }
        const incrementFav = () => {
            setFav(prev => prev + 1)
            console.log(`Ya tenemos ${fav + 1} Favoritos`)
        }
        const incrementMje = () => {
            setMje(prev => prev + 1)
            console.log(`Ya tenemos ${mje + 1} Mensajes`)
        }
        return (

            <div className='IconosMenu'>
                <NavLink to={`/`} className={'delay08'}><Messajes callback={incrementMje} click={mje} /></NavLink>
                <NavLink to='/' className={'delay09'}><CartWidget callback={increment} click={count} /></NavLink>
                <NavLink to='/' className={'delay10'}><Favorites callback={incrementFav} click={fav} /></NavLink>                
            </div>

        )
    }
    return (

        <section>
            <button className='burguer' onClick={toggleMenu}></button>
            <div className='menu'>
                <nav>
                    <NavLink to='/' className={'delay00'}><li>Inicio</li></NavLink>
                    <NavLink to='/category/Raqueta' className={'delay01'}><li>Raquetas</li></NavLink>
                    <NavLink to='/category/Tubos' className={'delay02'}><li>Tubos</li></NavLink>
                    <NavLink to='/category/Zapatillas' className={'delay03'}><li>Zapatillas</li></NavLink>
                    <NavLink to='/category/Remera' className={'delay04'}><li>Remeras</li></NavLink>
                    <NavLink to='/category/Muñequeras' className={'delay05'}><li>Muñequeras</li></NavLink>
                    <NavLink to='/category/Vincha' className={'delay06'}><li>Vinchas</li></NavLink>

                    <NavLink to={`/`} className={'delay07'}><img src={buscar} alt="icono" /> Buscar</NavLink>                    

                    <Counter />

                </nav>
            </div>            

        </section>
    )
}

export default Navbar;