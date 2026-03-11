import { Link } from "react-router-dom";

const Item = ({ item }) => {
  const user = item.owner.account;
  const details = item.product_details;
  const brand = details[0].MARQUE || "H&M";
  const size = details[0].TAILLE || "M / 38 / 8";

  return (
    <Link to={`/offer/${item._id}`} className="item">
      <article>
        <div className="user">
          <img src={user.avatar.url} className="avatar" />
          <span>{user.username}</span>
        </div>
        <img src={item.product_pictures[0].url} alt="" />
        <div className="item-details">
          <p className="price">
            {item.product_price.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
            })}{" "}
            €
          </p>
          <p>{size}</p>
          <p>{brand}</p>
        </div>
      </article>
    </Link>
  );
};

export default Item;
