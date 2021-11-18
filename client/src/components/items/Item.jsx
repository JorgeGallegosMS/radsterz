import { useCart, CARTACTIONS } from "../../context/CartContext";
import { Link, useHistory } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { cloudName } from "../../vars";
import axios from "axios";

const Item = ({ item }) => {
  const [cart, dispatch] = useCart();

  const history = useHistory();

  const addToCart = (item) => {
    const { name, price, imageId, _id, imageUrl, inStock } = item;
    const found = cart.find((cartItem) => cartItem.id === item._id);
    if (!found) {
      const cartItem = {
        name,
        price,
        imageId,
        id: _id,
        imageUrl,
        inStock,
        quantity: 1,
      };
      dispatch({
        type: CARTACTIONS.ADD,
        item: cartItem,
      });
    }
  };

  const removeItem = async () => {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: `/api/items/${item._id}`,
      });
      const itemId = data.deleted._id;
      const found = cart.find((cartItem) => cartItem.id === itemId);
      if (found) dispatch({ type: CARTACTIONS.REMOVE, id: found.id });
      history.push("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="item-info">
      <h1>{item.name}</h1>
      <h2>{item.description}</h2>
      <h3>
        {(item.price / 100).toLocaleString("en", {
          style: "currency",
          currency: "USD",
        })}
      </h3>
      <Link to={`/items/${item._id}`}>
        <Image cloudName={cloudName} public-id={`${item.imageId}.jpg`}>
          <Transformation width="300" height="300" crop="fill" />
        </Image>
      </Link>
      <button className="btn" onClick={() => addToCart(item)}>
        Add To Cart
      </button>
      <Link className="btn" to={`/items/${item._id}/edit`}>
        Edit
      </Link>
      <button className="btn" onClick={removeItem}>
        Delete
      </button>
    </div>
  );
};

export default Item;
