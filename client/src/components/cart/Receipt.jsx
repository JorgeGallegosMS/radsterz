import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useCart, ACTIONS } from '../../context/CartContext'
import PurchasedItem from './PurchasedItem'

const Receipt = () => {
  const [cart, dispatch] = useCart()
  const [purchasedItems, setPurchasedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    if (cart.length) {
      const newCart = [...cart]
      dispatch({type: ACTIONS.EMPTY})
      setPurchasedItems([...newCart])
      setLoading(false)
    }
  }, [cart])

  return loading ? (
    <>
      <h1>Please wait...</h1>
    </>
  ) : (
    <>
      <div>
        Order summary. <button onClick={() => history.push('/')} className="btn" to="/">Back home</button>
      </div>
      <div>
        {purchasedItems.map(item => (
          <PurchasedItem key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}

export default Receipt
