import "./Offer.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetails from "../../components/ItemDetails";
import { MdError } from "react-icons/md";

const apiUrl = import.meta.env.VITE_API_URL;

const Offer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/offer/${id}`);
        setItem(response.data);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && setErrorMessage(error.response.message);
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
          !errorMessage ? (
          <article>
            <img
              src={item.product_pictures[0].secure_url}
              alt="photo du produit"
            />
            <ItemDetails item={item} />
          </article>
          ) :
          <div className="error404">
            <MdError />
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Offer;
