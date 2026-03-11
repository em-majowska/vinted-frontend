import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { useState, useEffect } from "react";
import axios from "axios";
import Offers from "../components/Offers";
const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/offers`);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.data);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <Hero />
      <Offers data={data.offers} />
    </main>
  );
};

export default Home;
