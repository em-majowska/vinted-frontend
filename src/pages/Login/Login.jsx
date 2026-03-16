import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const localUrl = import.meta.env.VITE_LOCAL_URL;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(localUrl + "/user/login", {
        email: email,
        password: password,
      });

      handleToken(response.data.token);
    } catch (error) {
      error.message && console.log(error.message);
      error.response && console.log(error.response.data);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    loginUser();
    navigate("/publish");
  };

  return (
    <main className="login">
      <section className="container">
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
              onChange={(event) => handleChange(event, setPassword)}
            />
          </label>
          <button className="btn-filled">Continuer</button>
        </form>
        <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
      </section>
    </main>
  );
};

export default Login;
