import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || "");

  return (
    <>
      <Router>
        <Header userToken={userToken} setUserToken={setUserToken} />
        <Routes>
          <Route
            path="/"
            element={<Home userToken={userToken} setUserToken={setUserToken} />}
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup setUserToken={setUserToken} />}
          />
          <Route
            path="/login"
            element={<Login setUserToken={setUserToken} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
