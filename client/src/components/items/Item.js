import { Link, useHistory } from 'react-router-dom'
import cloudinary from '../../lib/cloudinary'
import { AdvancedImage } from '@cloudinary/react'
import { fill } from '@cloudinary/base/actions/resize'
import axios from 'axios'

const Item = ({ item }) => {
  const image = cloudinary.image(`Items/${item.imageId}`)
  image.resize(fill().width(400).height(400))
  const history = useHistory()
  const removeItem = async () => {
    try {
      await axios({
        method: 'DELETE',
        url: `/api/items/${item._id}`
      })
      history.push('/')
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <div>
      <h1>{item.name}</h1>
      <h2>{item.description}</h2>
      <h3>${item.price/100}</h3>
      <Link to={`/items/${item._id}`}><AdvancedImage cldImg={image}/></Link>
      <button><Link to={`/items/${item._id}/edit`}>Edit</Link></button>
      <button onClick={removeItem}>Delete</button>
    </div>
  )
}

export default Item
