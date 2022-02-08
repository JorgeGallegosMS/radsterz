import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Item from "./Item";
import { useCart } from "../../context/CartContext";

const Items = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: "/api/items",
        });
        setItems(data);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  console.log(cart);
  return items.length ? (
    <div className="grid mt-24 grid-cols-1 gap-3 sm:mt-0 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-6">
      {items.map((item) => (
        <Item key={item._id} item={item} />
      ))}
    </div>
  ) : (
    <div>
      There are no items. <Link to="/items/new">Add some here</Link>
    </div>
  );
};

export default Items;
