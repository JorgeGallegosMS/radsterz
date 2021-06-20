import { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ItemContext from '../../context/ItemContext'
import axios from 'axios'

const Item = ({ id }) => {
  const history = useHistory()
  const { items, setItems } = useContext(ItemContext)
  const item = items.filter(data => data._id === id)[0]
  console.log(item)
  const removeItem = async () => {
    try {
      const { data: { deleted } } = await axios({
        method: 'DELETE',
        url: `/items/${id}`
      })
      const filteredItems = items.filter(data => data._id !== id)
      setItems([...filteredItems])
      history.push('/')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <h1>{item.name}</h1>
      <h2>{item.description}</h2>
      <h3>{item.price/100}</h3>
      <button><Link to={`/items/${item._id}/edit`}>Edit</Link></button>
      <button><Link to={`/items/${item._id}`}>View</Link></button>
      <button onClick={removeItem}>Delete</button>
    </div>
  )
}

export default Item
