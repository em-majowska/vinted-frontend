import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginModal = ({
  setLoginVisible,
  setSignupVisible,
  handleToken,
  destination,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const currentPosition = window.pageYOffset;
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      document.body.style.overflow = "unset";
      window.scrollTo({ top: currentPosition, behavior: "smooth" });
    };
  }, []);

  const localUrl = import.meta.env.VITE_LOCAL_URL;

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(localUrl + "/user/login", {
        email: email,
        password: password,
      });

      handleToken(response.data.token);
      setLoginVisible(false);
      if (destination) {
        navigate(destination);
      }
    } catch (error) {
      error.message && setErrorMessage(error.message);
      error.response && setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div
      className="modal-root login"
      onClick={() => {
        setLoginVisible(false);
      }}>
      <section
        className="modal container"
        onClick={(event) => {
          event.stopPropagation();
        }}>
        <button
          className="close-btn"
          onClick={() => {
            setLoginVisible(false);
            if (location.pathname === "/publish") navigate("/");
          }}>
          X
        </button>
        <h1>Se connecter</h1>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              required
              onChange={(event) => handleChange(event, setEmail)}
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              value={password}
              required
              onChange={(event) => handleChange(event, setPassword)}
            />
          </label>
          <button className="btn-filled">Continuer</button>
          {errorMessage && (
            <div className="error">
              <p>{errorMessage}</p>
            </div>
          )}
        </form>
        <a
          onClick={() => {
            setLoginVisible(false);
            setSignupVisible(true);
          }}>
          Pas encore de compte ? Inscris-toi !
        </a>
      </section>
    </div>
  );
};

export default LoginModal;
