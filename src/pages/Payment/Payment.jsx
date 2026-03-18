import "./Payment.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import CheckoutForm from "../../components/CheckoutForm";

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripePublicKey);

const Payment = () => {
  const token = Cookies.get("userToken");
  const { item, tax, delivery, total } = useLocation().state;

  const options = {
    mode: "payment",
    amount: total * 100,
    currency: "eur",
    appearance: {},
  };
  return !token ? (
    <Navigate to={"/offer/" + item._id} state={{ from: "/payment" }} />
  ) : (
    <main className="payment">
      <div className="container">
        <h1>Résumé de la commande</h1>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            item={item}
            tax={tax}
            total={total}
            delivery={delivery}
          />
        </Elements>
      </div>
    </main>
  );
};

export default Payment;
