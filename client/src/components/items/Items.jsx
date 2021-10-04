import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Item from "./Item";

const Items = () => {
  const [items, setItems] = useState([]);

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
  return items.length ? (
    <div className="items">
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
