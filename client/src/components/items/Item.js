import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const Item = ({ item }) => {
  const history = useHistory()
  const removeItem = async () => {
    try {
      await axios({
        method: 'DELETE',
        url: `/items/${item._id}`
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
      <Link to={`/items/${item._id}`}><img src={item.imageUrl} alt=""/></Link>
      <button><Link to={`/items/${item._id}/edit`}>Edit</Link></button>
      <button onClick={removeItem}>Delete</button>
    </div>
  )
}

export default Item
