import { useState } from 'react'

const ItemForm = (props) => {
  const [item, setItem] = useState({
    name: props.item ? props.item.name : '',
    description: props.item ? props.item.description : '',
    price: props.item ? props.item.price: '',
    image: props.item ? props.item.image: ''
  })
  const { name, description, price, image } = item

  const handleSubmit = event => {
    event.preventDefault()
    props.handleSubmit({...item})
  }
  console.log(item)
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
      {/* <input 
        type="file" 
        name="image" 
        id="image" 
        accept="image/*"
        onChange={event => handleChange(event, setImage)}
      /> */}
      <input 
        type="text" 
        name="image" 
        id="image" 
        placeholder="Image Link"
        value={image}
        onChange={event => setItem({...item, image: event.target.value})}
      />
      <button onClick={handleSubmit} type="submit">{props.button}</button>
    </>
  )
}

export default ItemForm
