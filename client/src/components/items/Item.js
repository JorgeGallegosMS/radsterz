import { useContext } from 'react'
import { Link } from 'react-router-dom'
import ItemContext from '../../context/ItemContext'
import axios from 'axios'

const Item = ({ id }) => {
  const { items, setItems } = useContext(ItemContext)
  const item = items.filter(item => item._id === id)[0]
  const removeItem = async () => {
    try {
      const { data: { deleted } } = await axios({
        method: 'DELETE',
        url: `/items/${item._id}`
      })
      const filteredItems = items.filter(data => data._id !== item._id)
      setItems([...filteredItems])
      console.log(deleted)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <h1>{item.name}</h1>
      <h2>{item.description}</h2>
      <h3>{item.price/100}</h3>
      <Link to={`/items/${item._id}/edit`}>Edit</Link>
      <Link to={`/items/${item._id}`}>View</Link>
      <button onClick={removeItem}>Delete</button>
    </div>
  )
}

export default Item
