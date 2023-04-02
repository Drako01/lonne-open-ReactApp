import { createContext, useState, useContext } from 'react';

const CartContext = createContext('Inicio')

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])    

    const addItem = (productToAdd) => {
        if(!isInCart(productToAdd.id)) {
            setCart(prev => [...prev, productToAdd])
        }
    }

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }

    const removeItem = (id) => {
        const updatedCart = cart.filter(prod => prod.id !== id)
        setCart(updatedCart)
    }
    
    const getTotalQuantity = () => {
        let totalQuantity = 0

        cart.forEach(prod => {
            totalQuantity += prod.quantity
        })

        return totalQuantity
    }

    const totalQuantity = getTotalQuantity()

    const getTotalPrice = () => {
        let totalPrice = 0

        cart.forEach(prod => {
            totalPrice += (prod.price * prod.quantity)            
        })

        return totalPrice
    }

    const totalPrice = getTotalPrice()


    const getItemCount = (productId) => {
        return cart.filter((item) => item.id === productId).reduce((total, item) => total + item.quantity, 0);
      };


    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, addItem, totalQuantity, getItemCount, totalPrice, removeItem, isInCart, clearCart }}>
            { children }
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}