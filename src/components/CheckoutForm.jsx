import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdError } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ item, total, delivery, tax }) => {
  const localUrl = import.meta.env.VITE_LOCAL_URL;

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [navigate, isSuccess]);

  const handleError = (error) => {
    setIsLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe) return;

    setIsLoading(true);

    const elementResponse = await elements.submit();

    if (elementResponse.error) {
      handleError(elementResponse.error);
      return;
    }
    const response = await axios.post(localUrl + "/payment", {
      title: item.product_name,
      amount: total * 100,
    });

    const clientSecret = response.data.client_secret;

    const confirmPaymentResponse = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      redirect: "if_required",
    });

    if (confirmPaymentResponse.error) {
      handleError(confirmPaymentResponse.error);
    } else {
      setIsLoading(false);
      setIsSuccess(true);
    }
  };

  return isSuccess ? (
    <section className="success">
      <h2>Félicitations !</h2>
      <p>
        Vous avez acheté <span>{item.product_name}</span> pour{" "}
        <span>{total} €</span> !<br />
        Vous serez redirigé vers la page d'accueil dans 5 secondes...
      </p>
    </section>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="details">
        <p>
          Commande
          <span>
            {item.product_price.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
            })}{" "}
            €
          </span>
        </p>
        <p>
          Frais protection acheteurs{" "}
          <span>
            {tax.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
            })}{" "}
            €
          </span>
        </p>
        <p>
          Frais de port{" "}
          <span>
            {delivery.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
            })}{" "}
            €
          </span>
        </p>
      </div>
      <div className="total">
        <p>
          Total{" "}
          <span>
            {total.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
            })}{" "}
            €
          </span>
        </p>
        <p>
          Il ne vous reste plus qu'un étape pour vous offrir{" "}
          <span>{item.product_name}</span>. Vous allez payer{" "}
          <span>{total}€</span> (frais de protection et frais de port inclus)
        </p>
      </div>
      <PaymentElement />
      <button
        className="btn-filled"
        disabled={!stripe || !elements || isLoading}>
        {isLoading ? (
          <ThreeDots
            height="30px"
            width="50px"
            radius="9"
            color="white"
            ariaLabel="three-dots-loading"
            wrapperClass="custom-loader"
            visible={true}
          />
        ) : (
          `Pay`
        )}
      </button>

      {/* show error  */}
      {errorMessage && (
        <div className="error">
          <MdError />
          <p>{errorMessage}</p>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
