import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import PriceRange from "./PriceRange";
import Cookies from "js-cookie";
import { useEffect } from "react";

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
  setDestination,
}) => {
  const token = Cookies.get("userToken");
  const navigate = useNavigate();
  const location = useLocation();

  // sync filters with url
  const [currentSearchParams, setSearchParams] = useSearchParams();
  const newQueryParameters = new URLSearchParams();

  useEffect(() => {
    const searchQueryTitle = currentSearchParams.get("title");
    if (searchQueryTitle) setSearchValue(searchQueryTitle);
  }, [currentSearchParams, setSearchValue]);

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

                if (event.target.value) {
                  if (location.search.length > 0) {
                    setSearchParams((prev) => {
                      prev.set("title", event.target.value);
                      return prev;
                    });
                  } else {
                    newQueryParameters.set("title", event.target.value);
                    setSearchParams(newQueryParameters);
                  }
                } else {
                  newQueryParameters.delete("title");
                  setSearchParams((prev) => {
                    prev.delete("title");
                    return prev;
                  });
                }
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

                    setSearchParams((prev) => {
                      prev.set("sort", !ascSorting);
                      return prev;
                    });
                  }}
                />
              </label>
              <div className="price-filter">
                <span> Prix entre :</span>
                <PriceRange
                  values={values}
                  setValues={setValues}
                  setSearchParams={setSearchParams}
                  currentSearchParams={currentSearchParams}
                />
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
                    setDestination("/publish");
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
