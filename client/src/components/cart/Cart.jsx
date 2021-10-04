import CartItem from "./CartItem";
import axios from "axios";
import { useCart, ACTIONS } from "../../context/CartContext";

const Cart = () => {
  const [cart, dispatch] = useCart();

  const increment = (id) => {
    const found = cart.find((cartItem) => cartItem.id === id);
    if (found) {
      dispatch({
        type: ACTIONS.INCREMENT,
        item: found,
      });
    }
  };

  const decrement = (id) => {
    const found = cart.find((cartItem) => cartItem.id === id);
    if (found) {
      found.quantity === 1
        ? dispatch({ type: ACTIONS.REMOVE, id: found.id })
        : dispatch({ type: ACTIONS.DECREMENT, item: found });
    }
  };

  const setupStripeData = (cart) => {
    return cart.map((cartItem) => {
      const { name, price, quantity } = cartItem;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name,
            images: [cartItem.imageUrl],
          },
          unit_amount: price,
        },
        quantity,
      };
    });
  };

  const checkout = async () => {
    const stripeLineItems = setupStripeData(cart);
    try {
      if (cart.length < 1) return;
      const { data } = await axios({
        method: "POST",
        url: "/api/stripe/checkout",
        headers: {
          "Content-Type": "application/json",
        },
        data: stripeLineItems,
      });
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
    }
  };

  return cart.length ? (
    <>
      <div>
        {cart.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            increment={increment}
            decrement={decrement}
          />
        ))}
      </div>
      <button className="btn" onClick={checkout}>
        Checkout
      </button>
      <button className="btn" onClick={() => dispatch({ type: ACTIONS.EMPTY })}>
        Empty Cart
      </button>
    </>
  ) : (
    <div>There are no items in the cart</div>
  );
};

export default Cart;
