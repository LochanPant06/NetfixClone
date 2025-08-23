import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import { useEffect } from "react";
import noImage from "../../../public/noImage.jpg";

function Topnav() {
  const [query, setquery] = useState("");
  const [searchs, setsearchs] = useState([]);

  const GetSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`); // https://api.themoviedb.org/3/search/multi

      console.log(data);
      setsearchs(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    GetSearch();
  }, [query]);

  return (
    <div className="w-full h-[10vh] relative justify-start items-center flex">
      <i className=" text-zinc-400 text-3xl ri-search-2-line "></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-zinc-400 ri-close-fill text-3xl"
        ></i>
      )}

      <div className="absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto">
        {searchs.map((s, i) => (
          <Link
            key={i}
            className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100"
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noImage
              }
              alt=""
            />
            <span>
              {s.name || s.title || s.original_name || s.original_title}
            </span>
            {/* agar simple ye use karenge to data aache se nahi aata hai to hame ye use karna hota hai  */}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topnav;
