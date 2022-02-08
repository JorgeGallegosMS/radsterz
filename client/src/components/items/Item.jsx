import { useCart, CARTACTIONS } from "../../context/CartContext";
import { Link, useHistory } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { cloudName } from "../../vars";
import axios from "axios";

const Item = ({ item, showItems = false }) => {
  const [cart, dispatch] = useCart();

  const history = useHistory();

  const addToCart = (item) => {
    const { name, price, imageId, _id, imageUrl, inStock } = item;
    const found = cart.find((cartItem) => cartItem.id == item._id);
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
    <div className="flex flex-col items-center shadow-2xl rounded-xl border bg-white">
      <Link to={`/items/${item._id}`}>
        <Image
          className="rounded-t-xl sm:h-[250px] sm:w-[350px]"
          cloudName={cloudName}
          public-id={`${item.imageId}.jpg`}
        >
          <Transformation crop="fit" />
        </Image>
      </Link>
      <div className="flex justify-between sm:flex-col w-full sm:mt-1">
        <h1 className="font-bold text-xl self-center max-w-full truncate px-4">
          {item.name}
        </h1>
        <div className="flex justify-between divide-x divide-black sm:divide-none sm:mb-1 sm:px-2">
          <h3 className="font-bold self-center mr-3 sm:self-end">
            {(item.price / 100).toLocaleString("en", {
              style: "currency",
              currency: "USD",
            })}
          </h3>
          <button
            onClick={() =>
              cart.some((cartItem) => cartItem.id === item._id)
                ? dispatch({
                    type: CARTACTIONS.REMOVE,
                    id: item._id,
                  })
                : addToCart(item)
            }
            className={` rounded-br-xl sm:border sm:border-black sm:rounded-full ${
              cart.some((cartItem) => cartItem.id === item._id)
                ? "bg-cyan-400"
                : "bg-white"
            }`}
          >
            <div className="p-2">
              {cart.some((cartItem) => cartItem.id === item._id) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;

{
  /* <div className="flex w-full py-2 justify-center">
  <button className="p-1 text-center" onClick={() => addToCart(item)}>
    Add To Cart
  </button>
  Use this with absolute position to lower right of photo
  <Link className="p-1 text-center" to={`/items/${item._id}/edit`}>
  Edit
</Link>
<button className="p-1 text-center" onClick={removeItem}>
  Delete
</button>
</div> */
}
