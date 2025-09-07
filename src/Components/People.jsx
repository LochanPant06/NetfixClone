import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";
import Loading from "./Loading";

function People() {
  document.title = "SCSD | People";
  const navigate = useNavigate();
  const [Category, setCategory] = useState("popular");

  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${Category}?page=${page}`);

      if (data.results.length > 0) {
        setPeople((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching People:", error);
    }
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      GetPeople();
    } else {
      setPage(1);
      setPeople([]);
      GetPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line
  }, [Category]);

  return people.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          People{" "}
          <small className="ml-2 text-zinc-600 text-sm">({Category})</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular"]}
            func={(e) => {
              setCategory(e.target.value);
            }}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        loader={<h1>Loading...</h1>}
        dataLength={people.length}
        next={GetPeople}
        hasMore={hasMore}
      >
        <Cards data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}
export default People;