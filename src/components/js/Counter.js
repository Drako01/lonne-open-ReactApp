import { useState } from 'react'
import CartWidget from './CartWidget'

const Counter = () => {
    const [count, setCount] = useState(0)

    const increment = () => {       
            setCount(count + 1)       
    }

    return (
        <div>
            <p></p>
            <CartWidget callback={increment} click={count}  />
        </div>
    )
}

export default Counter