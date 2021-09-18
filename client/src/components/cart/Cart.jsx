import CartItem from './CartItem'
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"

// TODO: Set up increment/decrement quantity, and remove from cart

const Cart = () => {
  const [cart, setCart] = useContext(CartContext)

  const increment = id => {
    const found = cart.find(cartItem => cartItem.id === id)
    if (found) {
      const newCart = cart.map(cartItem => cartItem.id === id ? {...found, quantity: found.quantity+1} : cartItem)
      localStorage.setItem('cart', JSON.stringify(newCart))
      setCart(newCart)
    }
  }

  const decrement = id => {
    const found = cart.find(cartItem => cartItem.id === id)
    const newCart = found.quantity === 1 ? 
        cart.filter(cartItem => cartItem.id !== id) : 
        cart.map(cartItem => cartItem.id === id ? {...found, quantity: found.quantity-1} : cartItem)
    localStorage.setItem('cart', JSON.stringify(newCart))
    setCart(newCart)
  }

  return (
    <div>
      {cart.map(cartItem => (
        <CartItem key={cartItem.id} cartItem={cartItem} increment={increment} decrement={decrement}/>
      ))}
    </div>
  )
}

export default Cart
