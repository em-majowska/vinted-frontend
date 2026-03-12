import "./Offer.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ItemDetails from "../../components/ItemDetails";
const apiUrl = import.meta.env.VITE_API_URL;

const Offer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/offer/${id}`);
        setItem(response.data);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.message.data);
      }
    };

    // timeout or response.data.message to show it doesnt exist

    fetchData();
  }, [id]);

  return (
    <main className="offer">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          <article>
            <img
              src={item.product_pictures[0].secure_url}
              alt="photo du produit"
            />
            <ItemDetails item={item} />
          </article>
        </div>
      )}
    </main>
  );
};

export default Offer;
