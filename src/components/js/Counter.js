import { useState } from 'react'
import CartWidget from './CartWidget'
import Favorites from './Favorites'


const Counter = () => {
    const [count, setCount] = useState(0)
    const [fav, setFav] = useState(0)

    const increment = () => {
        setCount(prev => prev + 1)
    }
    const incrementFav = () => {
        setFav(prev => prev + 1)
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