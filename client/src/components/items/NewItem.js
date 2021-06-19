import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import ItemForm from './ItemForm'
import ItemContext from '../../context/ItemContext'
import './css/NewItem.css'
import axios from 'axios'


const NewItem = () => {
  const { items, setItems } = useContext(ItemContext)
  const history = useHistory()
  const handleSubmit = async itemInfo => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/items/new',
        headers: {
          "Content-Type": "application/json"
        },
        data: itemInfo
      })
      console.log({...data})
      setItems([...items, {...data}])
      history.replace('/items')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <form className="new-item-form" encType="multipart/form-data">
        <h1>New Item</h1>
        <ItemForm handleSubmit={handleSubmit} button={"Create Item"}/>
      </form>
    </>
  )
}

export default NewItem
