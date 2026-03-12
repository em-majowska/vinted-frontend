import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ItemDetails from "../components/ItemDetails";
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

    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <article className="offer container">
        <img src={item.product_pictures[0].url} alt="photo du produit" />
        <ItemDetails item={item} />
      </article>
    </main>
  );
};

export default Offer;
