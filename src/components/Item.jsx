import { Link } from "react-router-dom";

const Item = ({ item }) => {
  const user = item.owner.account;
  const details = {};

  item.product_details.map((obj) => {
    const key = Object.keys(obj);
    details[key] = obj[key];
  });

  return (
    <Link to={`/offer/${item._id}`} className="item">
      <article className="item-article">
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
          <p>{details.TAILLE}</p>
          <p>{details.MARQUE}</p>
        </div>
      </article>
    </Link>
  );
};

export default Item;
