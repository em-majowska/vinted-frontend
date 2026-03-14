import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const Signup = ({ handleToken }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const registerUser = async () => {
    try {
      const response = await axios.post(apiUrl + "/user/signup", {
        username: username,
        email: email,
        password: password,
        newsletter: newsletter,
      });

      handleToken(response.data.token);
    } catch (error) {
      error.message && console.log(error.message);
      error.response && console.log(error.response.data);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    registerUser();
    navigate("/");
  };

  return (
    <main className="signup">
      <section className="container">
        <h1>S'inscrire</h1>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(event) => {
                handleChange(event, setUsername);
              }}
              required
            />
            <span>
              Utilise des lettres, des chiffres ou les deux. Les autres membres
              Vinted verront ce nom sur ton compte.
            </span>
          </label>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                handleChange(event, setEmail);
              }}
              required
            />
            <span>
              Saisis l'adresse e-mail que tu souhaites utiliser sur Vinted
            </span>
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              pattern="^.*(?=.{7,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?]).*$"
              minLenght="7"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) => {
                handleChange(event, setPassword);
              }}
              required
            />
            <span>
              Saisis au moins 7 caractères, dont au moins 1 lettre et 1 chiffre
            </span>
          </label>
          <label htmlFor="newsletter">
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              onChange={() => {
                setNewsletter(!newsletter);
              }}
            />
            <p>
              <span className="checkbox">
                <FaCheck />
              </span>{" "}
              S'inscrire à notre newsletter
            </p>
          </label>
          <span>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </span>

          {/* <Link className="btn-filled">S'inscrire</Link> */}
          <button className="btn-filled">S'inscrire</button>
        </form>
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </section>
    </main>
  );
};

export default Signup;
