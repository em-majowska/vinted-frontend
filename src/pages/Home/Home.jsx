import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../../components/Hero";
import Offers from "../../components/Offers";
import { useSearchParams } from "react-router-dom";

const Home = ({ searchValue, ascSorting, values, setLoginVisible }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentSearchParams] = useSearchParams();

  useEffect(() => {
    // get queries from url
    const searchQueryTitle = currentSearchParams.get("title");
    const sort = currentSearchParams.get("sort");
    const priceMin = currentSearchParams.get("priceMin");
    const priceMax = currentSearchParams.get("priceMax");

    // add filters to query url
    const filters = {
      title: searchQueryTitle ? searchQueryTitle : searchValue,
      sort: sort || ascSorting ? "price-asc" : "price-desc",
      priceMin: priceMin ? priceMin : values[0],
      priceMax: priceMax ? priceMax : values[1],
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
        const response = await axios.get(
          import.meta.env.BASE_URL + `/offers` + str,
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.data);
      }
    };

    fetchData();
  }, [searchValue, ascSorting, values, currentSearchParams]);

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
