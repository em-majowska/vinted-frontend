import { Link } from "react-router-dom";
import Item from "./Item";

const Offers = ({ data }) => {
  return (
    <section className="offers container">
      {data.map((item) => {
        return (
          <Link key={item._id} to={`/offer/${item._id}`} className="item">
            <Item item={item} />
          </Link>
        );
      })}
    </section>
  );
};

export default Offers;
