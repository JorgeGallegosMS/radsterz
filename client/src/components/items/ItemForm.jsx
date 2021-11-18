import { useState } from "react";

const ItemForm = (props) => {
  const [error, setError] = useState("");
  const [item, setItem] = useState({
    name: props.item ? props.item.name : "",
    description: props.item ? props.item.description : "",
    price: props.item ? props.item.price : "",
    imageId: props.item ? props.item.imageId : "",
    imageUrl: props.item ? props.item.imageUrl : "",
  });
  const { name, description, price, imageId } = item;

  const [image, setImage] = useState("");

  const imageChange = (event) => {
    if (!event.target.files.length) return;
    const files = event.target.files;
    console.log(files);
    setImage(files[0]);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!image && props.button === "Create Item") {
        setError("Please select an image");
        return;
      }

      const formFilled = !!(name && description && price);
      if (!formFilled) {
        setError("Form has not been filled completely");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("imageId", imageId);
      image && formData.append("image", image);

      props.handleSubmit(formData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {error && (
        <div className="error" onClick={(e) => setError("")}>
          {error}
        </div>
      )}
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        value={name}
        onChange={(event) => setItem({ ...item, name: event.target.value })}
      />
      <input
        type="text"
        name="description"
        id="description"
        placeholder="Description"
        value={description}
        onChange={(event) =>
          setItem({ ...item, description: event.target.value })
        }
      />
      <input
        type="text"
        name="price"
        id="price"
        placeholder="Price"
        value={price}
        onChange={(event) => setItem({ ...item, price: event.target.value })}
      />
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={imageChange}
      />
      <button className="btn" onClick={handleSubmit} type="submit">
        {props.button}
      </button>
    </>
  );
};

export default ItemForm;
