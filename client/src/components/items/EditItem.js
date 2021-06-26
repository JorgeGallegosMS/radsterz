import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import ItemForm from './ItemForm'

const EditItem = () => {
  const history = useHistory()
  const { id } = useParams()
  const [item, setItem] = useState()
  
  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await axios({
            method: 'GET',
            url: `/items/${id}`
          })
          setItem(data)
        } catch(error) {
          console.error(error.message)
        }
      }
    )()
  }, [id])

  const handleSubmit = async itemInfo => {
    try {
      await axios({
        method: 'PUT',
        url: `/items/${id}`,
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: itemInfo
      })
      history.replace('/')
    } catch (error) {
      console.error(error.message)
    }
  }
  return item ? (
    <>
      <form encType="multipart/form-data">
        <h1>Edit Item</h1>
        <ItemForm handleSubmit={handleSubmit} item={item} button={"Update"}/>
      </form>
    </>
  ) : (
    <>Loading...</>
  )
}

export default EditItem
