import { Link, useHistory } from 'react-router-dom'
import { Image, Transformation } from 'cloudinary-react'
import { cloudName } from '../../vars'
import axios from 'axios'

const Item = ({ item }) => {
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
    <div className="item-info">
      <h1>{item.name}</h1>
      <h2>{item.description}</h2>
      <h3>${item.price/100}</h3>
      <Link to={`/items/${item._id}`}>
        <Image cloudName={cloudName} public-id={`${item.imageId}.jpg`}>
          <Transformation width="300" height="300" crop="fill"/>
        </Image>
      </Link>
      <Link className="btn" to={`/items/${item._id}/edit`}>Edit</Link>
      <a className="btn" onClick={removeItem}>Delete</a>
    </div>
  )
}

export default Item
