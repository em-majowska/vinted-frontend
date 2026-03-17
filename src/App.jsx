import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Header from "./components/Header";
import { useState } from "react";
import Cookies from "js-cookie";
import { MdError } from "react-icons/md";
import Publish from "./pages/Publish/Publish";
import Payment from "./pages/Payment/Payment";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";

function App() {
  // is User logged in
  const [isConnected, setIsConnected] = useState(
    Cookies.get("userToken") || false,
  );

  // Filters
  const [values, setValues] = useState([0, 1000]);
  const [searchValue, setSearchValue] = useState("");
  const [ascSorting, setAscSorting] = useState(false);

  // Modals visibility states
  const [signupVisible, setSignupVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  // helper function to set/remove token Cookie
  const handleToken = (token) => {
    if (!token) {
      console.log("no", token);

      Cookies.remove("userToken");
      setIsConnected(false);
    } else {
      console.log("yes", token);

      Cookies.set("userToken", token, { expires: 7 });
      setIsConnected(true);
    }
  };

  return (
    <div className="App">
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
          signupVisible={signupVisible}
          setSignupVisible={setSignupVisible}
          setLoginVisible={setLoginVisible}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchValue={searchValue}
                values={values}
                ascSorting={ascSorting}
                setLoginVisible={setLoginVisible}
              />
            }
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/publish"
            element={<Publish setLoginVisible={setLoginVisible} />}
          />
          <Route path="/payment" element={<Payment />} />
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
        {signupVisible && (
          <SignupModal
            setSignupVisible={setSignupVisible}
            setLoginVisible={setLoginVisible}
            handleToken={handleToken}
          />
        )}
        {loginVisible && (
          <LoginModal
            setLoginVisible={setLoginVisible}
            setSignupVisible={setSignupVisible}
            handleToken={handleToken}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
