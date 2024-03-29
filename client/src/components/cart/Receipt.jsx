import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useCart, CARTACTIONS } from "../../context/CartContext";
import PurchasedItem from "./PurchasedItem";

const Receipt = () => {
  const [cart, dispatch] = useCart();
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setPurchasedItems([...cart]);
    dispatch({ type: CARTACTIONS.EMPTY });
  }, []);

  return purchasedItems.length ? (
    <>
      <h1>Please wait...</h1>
    </>
  ) : (
    <>
      <div>
        Order summary.{" "}
        <button onClick={() => history.push("/")} className="btn">
          Back home
        </button>
      </div>
      <div>
        {purchasedItems.map((item) => (
          <PurchasedItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default Receipt;
