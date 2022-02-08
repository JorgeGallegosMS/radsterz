import { Image, Transformation } from "cloudinary-react";
import { Link } from "react-router-dom";
import { cloudName } from "../../vars";
const CartItem = ({ cartItem, increment, decrement }) => {
  const formattedPrice = (cartItem.price / 100).toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });
  const formattedTotalPrice = (
    (cartItem.price / 100) *
    cartItem.quantity
  ).toLocaleString("en", { style: "currency", currency: "USD" });
  return (
    <tr>
      <td className="border border-slate-700">
        <div className="flex justify-evenly p-2">
          <Link to={`/items/${cartItem.id}`}>
            <Image
              className="rounded-xl h-full"
              cloudName={cloudName}
              public-id={`${cartItem.imageId}.jpg`}
            >
              <Transformation crop="fit" width={150} height={150} />
            </Image>
          </Link>

          <h1 className="self-center">{cartItem.name}</h1>
        </div>
      </td>
      <td className="border border-slate-700">
        <h3>
          <span className="font-bold">{formattedPrice}</span>
        </h3>
      </td>
      <td className="border border-slate-700">
        <div className="flex justify-center">
          <button
            className="bg-black rounded-full px-2 text-white"
            onClick={() => decrement(cartItem.id)}
          >
            -
          </button>
          <div className="mx-1 text-xl">{cartItem.quantity}</div>
          <button
            className="bg-black rounded-full px-2 text-white"
            onClick={() => increment(cartItem.id)}
          >
            +
          </button>
        </div>
      </td>
      <td className="border border-slate-700">{formattedTotalPrice}</td>
    </tr>
  );
};

export default CartItem;
