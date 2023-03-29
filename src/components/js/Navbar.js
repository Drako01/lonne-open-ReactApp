import { NavLink } from 'react-router-dom';
import { useState } from 'react'
import CartWidget from './CartWidget'


const Navbar = () => {
    const toggleMenu = () => {
        document.body.classList.toggle('open')
    }
    const Counter = () => {
        const [count, setCount] = useState(0)

        const increment = () => {
            setCount(prev => prev + 1)
            console.log(`El carrito tiene ${count + 1} items`)
        }
        
        return (
            <div className='IconosMenu'>
                <NavLink to='/' className={'delay09'}><CartWidget callback={increment} click={count} /></NavLink>           
            </div>
        )
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

                    <Counter />

                </nav>
            </div>            

        </section>
    )
}

export default Navbar;