import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../../components/Hero";
import Offers from "../../components/Offers";

const apiUrl = import.meta.env.VITE_API_URL;

const Home = ({ searchValue, ascSorting, values }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = {
      title: searchValue,
      sort: ascSorting ? "price-asc" : "price-desc",
      priceMin: values[0],
      priceMax: values[1],
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/offers`, { params });

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.data);
      }
    };

    fetchData();
  }, [searchValue, ascSorting, values]);

  return (
    <main className="home">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Hero />
          <Offers data={data.offers} searchValue={searchValue} />
        </>
      )}
    </main>
  );
};

export default Home;
