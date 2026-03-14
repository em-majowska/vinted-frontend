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

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const handleToken = (token) => {
    if (!token) {
      Cookies.remove("userToken");
      setIsConnected(true);
    } else {
      Cookies.set("userToken", token, { expires: 7 });
      setIsConnected(true);
    }
  };

  return (
    <>
      <Router>
        <Header isConnected={isConnected} handleToken={handleToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup setIsConnected={setIsConnected} />}
          />
          <Route
            path="/login"
            element={<Login setIsConnected={setIsConnected} />}
          />
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
