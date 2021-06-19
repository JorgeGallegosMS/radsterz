import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import ItemContext from '../../context/ItemContext'
import Item from './Item'

const ShowItem = () => {
  const { id } = useParams()
  const { items } = useContext(ItemContext)

  const item = items.filter(data => data._id === id)[0]
  console.log({item})

  return (
    <>
      <Item id={id}/>
    </>
  )
}

export default ShowItem
