import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";
import Loading from "./Loading";

function Popular() {
  document.title = "SCSD | Popular ";
  const navigate = useNavigate(); //peeche jane ke liye
  const [Category, setCategory] = useState("movie"); // Fix initial state

  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`/${Category}/popular?page=${page}`); // Add slash
      if (data.results && data.results.length > 0) {
        setPopular((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching wallpaper:", error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setPage(1);
      setPopular([]); // setPopular ko khale kar diya hai
      GetPopular(); //setPopular ko khali karke GetPopular ko call kar diya hai
    }
  };

  useEffect(() => {
    refreshHandler();
    // GetPopular();
  }, [Category]);

  return popular.length > 0 ? (
    // overflow-hidden overflow-y-auto neeche wale mai use hua tha
    <div className=" w-screen h-screen ">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Popular
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => {
              setCategory(e.target.value);
            }}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>
      {/* ye saare syntex infinite scroll ke liye hai ye jo cheeze inside infinite scroll ke likhe hai wo likhenge tabhi work karega */}
      <InfiniteScroll
        loader={<h1>Loading...</h1>}
        dataLength={popular.length}
        next={GetPopular}
        // hasMore={true}
        hasMore={hasMore}
      >
        <Cards data={popular} title={Category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Popular;
