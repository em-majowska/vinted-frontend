import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="vinted logo" />{" "}
        </Link>
        <form>
          <div className="search-bar">
            <FaMagnifyingGlass />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Rechercher des articles"
            />
          </div>
          <div className="filters">
            <label htmlFor="sort" className="sort-filter">
              Trier par prix :
              <input type="checkbox" name="sorting" id="sort" />
            </label>
            <label htmlFor="price" className="price-filter">
              Prix entre :
              <input
                type="range"
                name="price"
                id="price"
                min="0"
                max="2000"
                step="10"
              />
            </label>
          </div>
        </form>
        <nav>
          <ul>
            <li>
              <a href="#">S'inscrite</a>
            </li>
            <li>
              <a href="#">Se connecter</a>
            </li>
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
