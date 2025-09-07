import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "../Components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  

  const navigate = useNavigate(); //peeche jane ke liye
  const [Category, setCategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

document.title = "SCSD | Trending ";  

  //jab ye page open hoga to ye title set hoga

  // const GetTrending = async () => {
  //   try {
  //     const { data } = await axios.get(`/trending/${Category}/${duration}?page=${page}`);
  //     settrending(data.results);
  //     settrending((prev) => [...prev, ...data.results]);
  //     console.log(data);
  //     setPage((prev) => prev + 1);
  //   } catch (error) {
  //     console.log("Error fetching wallpaper:", error);
  //   }
  // };
  // console.log(trending);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${Category}/${duration}?page=${page}`
      );
2
      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching wallpaper:", error);
    }
  };



  const refreshHandler = () => {
    if (trending.length === 0) {
      GetTrending();
    } else {
      setPage(1);
      settrending([]);// settrending ko khale kar diya hai 
      GetTrending();//settrending ko khali karke getTrending ko call kar diya hai
    }
  };



  useEffect(() => {
    refreshHandler();
    // GetTrending();
  }, [Category, duration]);



  return trending.length > 0 ? (
    // overflow-hidden overflow-y-auto neeche wale mai use hua tha
    <div className=" w-screen h-screen ">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => {
              setCategory(e.target.value);
            }}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => {
              setduration(e.target.value);
            }}
          />
        </div>
      </div>
      {/* ye saare syntex infinite scroll ke liye hai ye jo cheeze inside infinite scroll ke likhe hai wo likhenge tabhi work karega */}
      <InfiniteScroll
        loader={<h1>Loading...</h1>}
        // loader={<Loading />}
        dataLength={trending.length}
        next={GetTrending}
        // hasMore={true}
        hasMore={hasMore}
      >
        <Cards data={trending} title={Category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
