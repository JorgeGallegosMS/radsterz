import { useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ItemContext from '../../context/ItemContext'
import axios from 'axios'
import ItemForm from './ItemForm'

const EditItem = () => {
  const history = useHistory()
  const { items, setItems } = useContext(ItemContext)
  const { id } = useParams()
  const item = items.filter(item => item._id === id)[0]
  const handleSubmit = async itemInfo => {
    try {
      const { data } = await axios({
        method: 'PUT',
        url: `/items/${id}`,
        headers: {
          "Content-Type": "application/json"
        },
        data: itemInfo
      })
      const filteredItems = items.filter(item => item._id !== id)
      setItems([data, ...filteredItems])
      history.replace('/')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <form encType="multipart/form-data">
        <h1>Edit Item</h1>
        <ItemForm handleSubmit={handleSubmit} item={item} button={"Update"}/>
      </form>
    </>
  )
}

export default EditItem
