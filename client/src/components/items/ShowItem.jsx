import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Item from "./Item";

const ShowItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

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
  return item ? (
    <div className="grid">
      <Item item={item} showItems={true} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ShowItem;
