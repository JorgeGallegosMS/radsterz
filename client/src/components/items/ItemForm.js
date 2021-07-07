import { useState } from 'react'

const ItemForm = (props) => {
  const [item, setItem] = useState({
    name: props.item ? props.item.name : '',
    description: props.item ? props.item.description : '',
    price: props.item ? props.item.price: '',
    imageId: props.item ? props.item.imageId: '',
    imageUrl: props.item ? props.item.imageUrl: ''
  })
  const { name, description, price, imageId } = item

  const [imageData, setImageData] = useState('')

  const imageChange = event => {
    const files = event.target.files
    if (!event.target.files.length) return
    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onloadend = () => {
      setImageData(reader.result)
    }
  }

  const handleSubmit = async event => {
    try {
      event.preventDefault()
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('imageId', imageId)
      if (imageData) formData.append('imageData', imageData)
      
      props.handleSubmit(formData)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <input 
        type="text" 
        name="name" 
        id="name" 
        placeholder="Name" 
        value={name}
        onChange={event => setItem({...item, name: event.target.value})}
      />
      <input 
        type="text" 
        name="description" 
        id="description" 
        placeholder="Description"
        value={description}
        onChange={event => setItem({...item, description: event.target.value})}
      />
      <input 
        type="text"
        name="price" 
        id="price" 
        placeholder="Price"
        value={price}
        onChange={event => setItem({...item, price: event.target.value})}
      />
      <input 
        type="file" 
        name="image" 
        id="image" 
        accept="image/*"
        onChange={imageChange}
      />
      <button onClick={handleSubmit} type="submit">{props.button}</button>
    </>
  )
}

export default ItemForm
