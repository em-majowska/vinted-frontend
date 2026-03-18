import { MdOutlineVerifiedUser } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ItemDetails = ({ item, setLoginVisible, setDestination }) => {
  const navigate = useNavigate();
  const token = Cookies.get("userToken");

  const tax = Math.round((item.product_price * 0.12 * 100) / 100);
  const total = Math.round((item.product_price + tax + 1.95) * 100) / 100;
  const delivery = 1.95;

  const productPriceTaxed = Math.round((item.product_price + tax) * 100) / 100;

  const details = {};

  item.product_details.map((obj) => {
    const key = Object.keys(obj);
    details[key] = obj[key];
  });

  const timePassed = (date) => {
    const now = new Date();
    const created = new Date(date);

    const seconds = Math.floor((now - created) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval === 1
        ? "Ajouté il y a 1 an"
        : `Ajouté il y a ${interval} ans`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1
        ? "Ajouté il y a 1 mois"
        : `Ajouté il y a ${interval} mois`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1
        ? "Ajouté il y a 1 jour"
        : `Ajouté il y a ${interval} jours`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1
        ? "Ajouté il y a 1 heure"
        : `Ajouté il y a ${interval} heures`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1
        ? "Ajouté il y a 1 minute"
        : `Ajouté il y a ${interval} minutes`;
    }

    return "Ajouté il y a quelques secondes";
  };

  return (
    <aside>
      <div className="top">
        <h1>{item.product_name}</h1>
        <p>
          {details["TAILLE"] && <span>{details.TAILLE} &#8729; </span>}
          <span>{details["ÉTAT"]}</span> &#8729;{" "}
          <span className="brand">{details.MARQUE}</span>
          {item.product_creationDate && (
            <span> &#8729; {timePassed(item.product_creationDate)}</span>
          )}
        </p>
      </div>
      <div className="middle">
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
        <div className="details">
          {item.product_details.map((obj, index) => {
            const key = Object.keys(obj);
            return (
              <p key={index}>
                <span>{key.toString().toLowerCase()}</span>{" "}
                <span>{obj[key] && obj[key].toLowerCase()}</span>
              </p>
            );
          })}
        </div>
      </div>
      <p className="description">{item.product_description}</p>
      <p>
        Envoi <span>à partir de 1,95 €</span>
      </p>
      <div className="buttons">
        <button
          className="btn-filled"
          item={item}
          tax={tax}
          total={total}
          delivery={delivery}
          onClick={() => {
            if (!token) {
              // setDestination("/payment");
              setLoginVisible(true);
            } else {
              navigate("/payment", {
                state: {
                  item,
                  tax,
                  total,
                  delivery,
                },
              });
            }
          }}>
          Acheter
        </button>
        {/* <Link
          to="/payment"
          className="btn-filled"
          state={{ item, tax, delivery, total }}>
          Acheter
        </Link> */}
        <button disabled>Faire une offre</button>
        <button disabled>Message</button>
      </div>
    </aside>
  );
};

export default ItemDetails;
