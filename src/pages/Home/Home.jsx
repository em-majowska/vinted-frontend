import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../../components/Hero";
import Offers from "../../components/Offers";

const Home = ({ searchValue, ascSorting, values, setLoginVisible }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localUrl = import.meta.env.VITE_LOCAL_URL;

    // add filters to query url
    const filters = {
      title: searchValue,
      sort: ascSorting ? "price-asc" : "price-desc",
      priceMin: values[0],
      priceMax: values[1],
    };
    let sign = "?";
    let str = "";

    for (const pair of Object.entries(filters)) {
      if (!str) {
        if (pair[1]) str += `${sign}${pair[0]}=${pair[1]}`;
      } else {
        sign = "&";
        if (pair[1]) str += `${sign}${pair[0]}=${pair[1]}`;
      }
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(localUrl + `/offers` + str);

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
          <Hero setLoginVisible={setLoginVisible} />
          <Offers data={data.offers} searchValue={searchValue} />
        </>
      )}
    </main>
  );
};

export default Home;
