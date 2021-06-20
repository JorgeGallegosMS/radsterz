import { useContext } from 'react'
import { Link } from 'react-router-dom'
import ItemContext from '../../context/ItemContext'
import Item from './Item'

const Items = () => {
  const { items } = useContext(ItemContext)
  return items.length ? (
    <div>
      {items.map(item => (
        <Item key={item._id} id={item._id}/>
      ))}
    </div>
  ) : (
    <div>There are no items. <Link to="/items/new">Add some here</Link></div>
  )
}

export default Items
