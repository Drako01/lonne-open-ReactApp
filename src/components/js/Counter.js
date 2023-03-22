import { useState } from 'react'
import CartWidget from './CartWidget'
import Favorites from './Favorites'


const Counter = () => {
    const [count, setCount] = useState(0)
    const [fav, setFav] = useState(0)

    const increment = () => {
        setCount(prev => prev + 1)
        console.log(`El carrito tiene ${count + 1 } items`)
    }
    const incrementFav = () => {
        setFav(prev => prev + 1)
        console.log(`Ya tenemos ${fav + 1} Favoritos`)
    }

    return (
        <div className='Counter'>
            <div>
                <CartWidget callback={increment} click={count} />
            </div>
            <div>
                <Favorites callback={incrementFav} click={fav} />
            </div>
        </div>
    )
}

export default Counter