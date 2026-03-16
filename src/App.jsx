import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { useState } from "react";
import Cookies from "js-cookie";
import { MdError } from "react-icons/md";
import Publish from "./pages/Publish/Publish";

function App() {
  const [isConnected, setIsConnected] = useState(
    Cookies.get("userToken") || false,
  );
  const [values, setValues] = useState([0, 1000]);
  const [searchValue, setSearchValue] = useState("");
  const [ascSorting, setAscSorting] = useState(false);

  const handleToken = (token) => {
    if (!token) {
      Cookies.remove("userToken");
      setIsConnected(false);
    } else {
      Cookies.set("userToken", token, { expires: 7 });
      setIsConnected(true);
    }
  };

  return (
    <>
      <Router>
        <Header
          isConnected={isConnected}
          handleToken={handleToken}
          values={values}
          setValues={setValues}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          ascSorting={ascSorting}
          setAscSorting={setAscSorting}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchValue={searchValue}
                values={values}
                ascSorting={ascSorting}
              />
            }
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={
              <Signup
                setIsConnected={setIsConnected}
                handleToken={handleToken}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setIsConnected={setIsConnected}
                handleToken={handleToken}
              />
            }
          />
          <Route path="/publish" element={<Publish />} />
          <Route
            path="*"
            element={
              <main className="container">
                <div className="error404">
                  <MdError /> <h1>Page non trouvable</h1>
                </div>
              </main>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
