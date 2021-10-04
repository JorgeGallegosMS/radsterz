import { Image, Transformation } from "cloudinary-react";
import { cloudName } from "../../vars";

const PurchasedItem = ({ item }) => {
  const { name, quantity, imageId } = item;
  return (
    <>
      <div>
        <h1>
          {quantity} x {name}
        </h1>
      </div>
      <Image cloudName={cloudName} public_id={`${imageId}.jpg`}>
        <Transformation width="300" height="150" crop="fill" />
      </Image>
    </>
  );
};

export default PurchasedItem;
