import { useParams } from 'react-router-dom'
import Item from './Item'

const ShowItem = () => {
  const { id } = useParams()

  return (
    <>
      <Item id={id}/>
    </>
  )
}

export default ShowItem
