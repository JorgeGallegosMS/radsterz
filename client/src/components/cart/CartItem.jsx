import { Image, Transformation } from 'cloudinary-react'
import { Link } from 'react-router-dom'
import { cloudName } from '../../vars'
const CartItem = ({cartItem, increment, decrement}) => {
  const formattedPrice = (cartItem.price/100 * cartItem.quantity).toLocaleString('en', {style: 'currency', currency: 'USD'})
  return (
    <>
      <h1>{cartItem.name}</h1>
      <h3>{formattedPrice}</h3>
      <Link to={`/items/${cartItem.id}`}>
        <Image cloudName={cloudName} public-id={`${cartItem.imageId}.jpg`}>
          <Transformation width="300" height="300" crop="fill"/>
        </Image>
      </Link>
      <h3>X{cartItem.quantity}</h3> <button className="btn" onClick={() => decrement(cartItem.id)}>-</button> <button className="btn" onClick={() => increment(cartItem.id)}>+</button>
    </>
  )
}

export default CartItem
