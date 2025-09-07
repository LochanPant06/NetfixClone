import React from "react";
import { Link } from "react-router-dom";
import noImage from "../../../public/noImage.jpg";

function HorizontalCards({ data }) {
  return (
    <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <div key={i} className="min-w-[15%] h-[35vh] mr-5 bg-zinc-900 mb-5">
            <img
              className="w-full h-[100px] object-cover"
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.poster_path
                    }`
                  : noImage
              }
              alt=""
            />
            <div className="text-white p-3 h-[130px] overflow-y-auto">
              <h1 className="text-xl font-semibold">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="text-md">
                {d.overview?.slice(0, 50) || "No overview available"}...
                <Link
                  to={`/${d.media_type}/details/${d.id}`}
                  className="text-zinc-500 ml-3"
                >
                  more
                </Link>
              </p>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center ">
          Nothing to show{" "}
        </h1>
      )}
    </div>
  );
}

export default HorizontalCards;
