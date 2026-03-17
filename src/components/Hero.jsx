import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Hero = ({ setLoginVisible }) => {
  const token = Cookies.get("userToken");
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="container">
        <div className="wrapper">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button
            className="btn-filled"
            onClick={() => {
              if (!token) {
                setLoginVisible(true);
              } else {
                navigate("/publish");
              }
            }}>
            {" "}
            Commencer à vendre
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
