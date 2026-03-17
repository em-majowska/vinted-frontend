import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoAddOutline } from "react-icons/io5";

const SignupModal = ({ handleToken, setSignupVisible, setLoginVisible }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const localUrl = import.meta.env.VITE_LOCAL_URL;

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [previewPicture, setPreviewPicture] = useState();

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("newsletter", newsletter);
    formData.append("picture", avatar);

    try {
      const response = await axios.post(localUrl + "/user/signup", formData);

      handleToken(response.data.token);
      if (location.state) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    } catch (error) {
      error.message && console.log(error.message);
      error.response && setErrorMessage(error.response.message);
    }
  };

  return (
    <div
      className="modal-root signup"
      onClick={() => {
        setSignupVisible(false);
      }}>
      <section
        className="modal container"
        onClick={(event) => {
          event.stopPropagation();
        }}>
        <button
          className="close-btn"
          onClick={() => {
            setSignupVisible(false);
          }}>
          X
        </button>
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
          <section>
            <div className="file-wrapper">
              {previewPicture && (
                <div className="previews">
                  <img src={previewPicture} alt="" className="preview" />
                </div>
              )}
              <label htmlFor="avatar" className="file">
                <IoAddOutline /> Ajoute une photo
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={(event) => {
                    // preview
                    const objectUrl = URL.createObjectURL(
                      event.target.files[0],
                    );
                    setPreviewPicture(objectUrl);

                    setAvatar(event.target.files[0]);
                  }}
                />
              </label>
            </div>
          </section>
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
              minlenght="7"
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

          <button className="btn-filled">S'inscrire</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
        <a
          // todo ask

          onClick={() => {
            setSignupVisible(false);
            setLoginVisible(true);
          }}>
          Tu as déjà un compte ? Connecte-toi !
        </a>
      </section>
    </div>
  );
};

export default SignupModal;
