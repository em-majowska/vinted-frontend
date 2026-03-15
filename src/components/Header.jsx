import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import PriceRange from "./PriceRange";

const Header = ({
  isConnected,
  handleToken,
  values,
  setValues,
  searchValue,
  setSearchValue,
  ascSorting,
  setAscSorting,
}) => {
  const navigate = useNavigate();

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
                  <Link to="/signup">S'inscrire</Link>
                </li>
                <li>
                  <Link to="/login">Se connecter</Link>
                </li>
              </>
            )}
            <li>
              <a href="#" className="btn-filled">
                Vends tes articles
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
