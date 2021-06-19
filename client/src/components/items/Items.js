import { useContext } from 'react'
import ItemContext from '../../context/ItemContext'
import Item from './Item'

const Items = () => {
  const { items } = useContext(ItemContext)
  return (
    <div>
      {items.map(item => (
        <Item key={item._id} id={item._id}/>
      ))}
    </div>
  )
}

export default Items
