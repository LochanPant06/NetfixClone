// Trailer.js
import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "../partials/NotFound";

function Trailer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  console.log(ytvideo);
  // console.log(ytvideo.key);
  // console.log(`https://www.youtube.com/watch?v=${ytvideo.key}`);
  return (
    <div className="bg-[rgba(0,0,0,0.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center text-white">
      <Link
        onClick={() => navigate(-1)}
        className=" absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[5%] top-[5%]"
      ></Link>
      {ytvideo ? (
        <ReactPlayer
          height={700}
          width={1300}
          src={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          controls={true}
          playing={true}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Trailer;
