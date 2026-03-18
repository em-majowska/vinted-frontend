import "./Offer.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdError } from "react-icons/md";
import ItemDetails from "../../components/ItemDetails";

const Offer = ({ setLoginVisible }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + "/offer/" + id,
        );

        setItem(response.data);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && setErrorMessage(error.response.data.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <main className="offer">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          {!errorMessage ? (
            <article>
              {item.product_pictures.length > 1 ? (
                <div className="img-container">
                  <div className="col-1">
                    <img src={item.product_image.secure_url} />
                  </div>
                  <div className="col-2">
                    {item.product_pictures.map((pic, index) => {
                      return (
                        index > 0 && <img key={index} src={pic.secure_url} />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <img
                  src={item.product_pictures[0].secure_url}
                  alt="photo du produit"
                />
              )}
              <ItemDetails item={item} setLoginVisible={setLoginVisible} />
            </article>
          ) : (
            <div className="error404">
              <MdError />
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Offer;
