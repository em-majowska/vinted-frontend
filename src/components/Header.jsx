import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import PriceRange from "./PriceRange";
import Cookies from "js-cookie";

const Header = ({
  isConnected,
  handleToken,
  values,
  setValues,
  searchValue,
  setSearchValue,
  ascSorting,
  setAscSorting,
  setSignupVisible,
  setLoginVisible,
}) => {
  const token = Cookies.get("userToken");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="vinted logo" />
        </Link>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}>
          <div className="search-bar">
            <FaMagnifyingGlass />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Rechercher des articles"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
            />
          </div>
          {location.pathname === "/" && (
            <div className="filters">
              <label htmlFor="sort" className="sort-filter">
                Trier par prix :
                <input
                  type="checkbox"
                  name="sorting"
                  id="sort"
                  onChange={() => {
                    setAscSorting(!ascSorting);
                  }}
                />
              </label>
              <div className="price-filter">
                <span> Prix entre :</span>
                <PriceRange values={values} setValues={setValues} />
              </div>
            </div>
          )}
        </form>
        <nav>
          <ul>
            {isConnected ? (
              <li>
                <button
                  className="btn-logout"
                  onClick={() => {
                    handleToken(null);
                    navigate("/");
                  }}>
                  Se déconnecter
                </button>
              </li>
            ) : (
              <>
                <li>
                  <button onClick={() => setSignupVisible(true)}>
                    S'inscrire
                  </button>
                </li>
                <li>
                  <button onClick={() => setLoginVisible(true)}>
                    Se connecter
                  </button>
                </li>
              </>
            )}
            <li>
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
                Vends tes articles
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
