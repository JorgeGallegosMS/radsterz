import { createContext, useReducer, useContext } from 'react'

export const CartContext = createContext()

export const ACTIONS = {
  ADD: 'addToCart',
  REMOVE: 'removeFromCart',
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  SET: 'setCart',
  EMPTY: 'emptyCart'
}

const reducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.ADD: {
      const newCart = [...state, action.item]
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    }
    case ACTIONS.REMOVE: {
      const newCart = state.filter(cartItem => cartItem.id !== action.id)
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    }
    case ACTIONS.INCREMENT: {
      const newCart = state.map(
        cartItem => cartItem.id === action.item.id ? {...action.item, quantity: action.item.quantity+1} : cartItem
      )
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    }
    case ACTIONS.DECREMENT: {
      const newCart = state.map(
        cartItem => cartItem.id === action.item.id ? {...action.item, quantity: action.item.quantity-1} : cartItem
      )
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    }
    case ACTIONS.SET: {
      localStorage.setItem('cart', JSON.stringify(action.cart))
      return action.cart
    }
    case ACTIONS.EMPTY: {
      const newCart = []
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    }
    default:
      throw new Error(`Unknown type ${action.type}`)
  }
}

export const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, [])

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)