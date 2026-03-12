import { MdOutlineVerifiedUser } from "react-icons/md";

const ItemDetails = ({ item }) => {
  const productPriceTaxed =
    Math.round((item.product_price + item.product_price * 0.12) * 100) / 100;
  const details = {};

  item.product_details.map((obj) => {
    const key = Object.keys(obj);
    details[key] = obj[key];
  });

  return (
    <aside>
      <div className="top">
        <h1>{item.product_name}</h1>
        <p>
          <span>{details.TAILLE}</span> &#8729; <span>{details["ÉTAT"]}</span>{" "}
          &#8729; <span className="brand">{details.MARQUE}</span> &#8729;{" "}
          <span>Ajouté il y a 2 heures</span>
        </p>
        <div className="price-details">
          <span>
            {item.product_price.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
            })}{" "}
            €
          </span>
          <span>
            {productPriceTaxed.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
            })}{" "}
            €
          </span>
          <p>
            Inclut la Protection acheteurs <MdOutlineVerifiedUser />
          </p>
        </div>
      </div>
      <div className="details">
        {item.product_details.map((obj, index) => {
          const key = Object.keys(obj);
          return (
            <p key={index}>
              <span>{key.toString().toLowerCase()}</span>{" "}
              <span>{obj[key].toLowerCase()}</span>
            </p>
          );
        })}
      </div>
      <p className="description">{item.product_description}</p>
      <p>
        Envoi <span>à partir de 1,95€</span>
      </p>
      <div className="buttons">
        <button className="btn-filled">Acheter</button>
        <button>Faire une offre</button>
        <button>Message</button>
      </div>
    </aside>
  );
};

export default ItemDetails;
