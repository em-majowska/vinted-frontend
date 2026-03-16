import { Link } from "react-router-dom";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const Item = ({ item }) => {
  const user = item.owner.account;
  const details = {};

  item.product_details.map((obj) => {
    if (Object.keys(obj) !== null) {
      const key = Object.keys(obj);
      details[key] = obj[key];
    }
  });
  const productPriceTaxed =
    Math.round((item.product_price + item.product_price * 0.12) * 100) / 100;

  return (
    <Link to={`/offer/${item._id}`} className="item">
      <article className="item-article">
        <div className="user">
          {user.avatar ? (
            <img src={user.avatar.secure_url} className="avatar" />
          ) : (
            <FaRegUserCircle className="avatar" />
          )}

          <span>{user.username}</span>
        </div>
        <img
          src={
            item.product_image.secure_url ||
            "https://operaparallele.org/wp-content/uploads/2023/09/Placeholder_Image.png"
          }
          alt="image du produit à vendre"
        />
        <div className="item-details">
          <p>{item.product_details[0].MARQUE || "Autre"}</p>
          <p>
            {item.product_details[1].TAILLE && item.product_details[1].TAILLE}
          </p>
          <p className="price">
            {item.product_price.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
            })}{" "}
            €
          </p>
          <p className="price-taxed">
            {productPriceTaxed.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
            })}{" "}
            €{" "}
            <span>
              incl. <MdOutlineVerifiedUser />
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
};

export default Item;
