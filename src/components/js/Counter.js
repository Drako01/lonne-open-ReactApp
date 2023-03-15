import { useState } from 'react'
import CartWidget from './CartWidget'

const Counter = () => {
    const [count, setCount] = useState(0)

    const increment = () => {       
            setCount(prev => prev + 1)       
    }

    return (
        <div>
            <CartWidget callback={increment} click={count}  />
        </div>
    )
}

export default Counter