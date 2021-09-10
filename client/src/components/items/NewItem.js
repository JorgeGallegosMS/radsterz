import { useHistory } from 'react-router-dom'
import ItemForm from './ItemForm'
import './css/NewItem.css'
import axios from 'axios'


const NewItem = () => {
  const history = useHistory()
  const handleSubmit = async itemInfo => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/api/items/new',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: itemInfo
      })
      if (data.statusCode !== 200) {
        console.log(`There was an error: Code: ${data.statusCode}`)
        return
      }
      console.log(data)
      history.replace(`/items/${data.item._id}`)
    } catch (error) {
      console.error(error)
    }
  }
  return (
      <form className="new-item-form" encType="multipart/form-data">
        <h1>New Item</h1>
        <ItemForm handleSubmit={handleSubmit} button={"Create Item"}/>
      </form>
  )
}

export default NewItem
