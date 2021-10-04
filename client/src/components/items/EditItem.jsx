import { useState, useEffect, useContext } from "react";
import { useCart, ACTIONS } from "../../context/CartContext";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import ItemForm from "./ItemForm";

const EditItem = () => {
  const [cart, dispatch] = useCart();
  const history = useHistory();
  const { id } = useParams();
  const [item, setItem] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `/api/items/${id}`,
        });

        setItem(data);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, [id]);

  const handleSubmit = async (itemInfo) => {
    try {
      const { data } = await axios({
        method: "PUT",
        url: `/api/items/${id}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: itemInfo,
      });

      const found = cart.find((cartItem) => cartItem.id === data.item._id);
      if (found) {
        const { imageId, imageUrl } = data.item;
        const newCart = cart.map((cartItem) =>
          cartItem.id === found.id ? { ...found, imageUrl, imageId } : cartItem
        );
        dispatch({
          type: ACTIONS.SET,
          cart: newCart,
        });
      }

      history.replace("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return item ? (
    <form encType="multipart/form-data">
      <h1>Edit Item</h1>
      <ItemForm handleSubmit={handleSubmit} item={item} button={"Update"} />
    </form>
  ) : (
    <>Loading...</>
  );
};

export default EditItem;
