import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const localCart = localStorage.getItem('cart')
    if (localCart) setCart(JSON.parse(localCart))
    if (!localCart) localStorage.setItem('cart', JSON.stringify(cart))
  }, [])

  console.log(`Cart from context: ${cart}`)

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  )
}