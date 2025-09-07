import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv } from "../Store/actions/tvActions";
import { useEffect } from "react";
import { removetv } from "../Store/reducers/tvSlice";
import Loading from "../Components/Loading";
import Horizontalcards from "../Components/partials/HorizontalCards";
import { Outlet } from "react-router-dom";

function TvDetails() {
  const { pathname } = useLocation(); //ye hook hume current url ka path deta hai
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

  const info = useSelector((state) => state.tv.info);

  const dispatch = useDispatch();
  // console.log(info);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    // console.log("Dispatched asyncloadtv with id:", id);
    return () => {
      dispatch(removetv()); 
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7),rgba(0,0,0,0.9)), 
        url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,

        backgroundPosition: "top-[10%]",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-screen px-[10%] overflow-y-scroll "
    >
      {/* part 1 navigation */}
      <nav className=" h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>

        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} //wikipedia link
        >
          <i className=" ri-global-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`} //imdb link
        >
          imdb
        </a>
      </nav>

      {/* part 2 Poster and details */}

      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-[50vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            //ye link khud se search karke nikalne padte hai {tmdb image link search karo google pe }
            info.detail.backdrop_path || info.detail.poster_path
          }`}
          alt=""
        />
        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-bold ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="text-2xl font-bold text-zinc-200  ">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>
          <div className="mt-3 mb-5 flex items-center gap-x-5">
            <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[7vh] h-[7vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed(0)}
              <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">
              User Score
            </h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>

          <h1 className="text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>
          <h1 className="text-2xl font mt-5 ">Overview</h1>
          <p>{info.detail.overview}</p>
        </div>
      </div>
      {/* part 3 available on platforms */}

      <div className="mb-10 w-full flex">
        <div className="w-[50%] flex flex-col gap-y-5 mt-10">
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className=" mt-5 flex gap-x-10 items-center text-white">
              <h3>Available on: Flatrate</h3>

              {info.watchproviders.flatrate.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.rent && (
            <div className="mt-5 flex gap-x-10 items-center text-white">
              <h3>Available on: Rent</h3>

              {info.watchproviders.rent.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.buy && (
            <div className="mt-5 flex gap-x-10 items-center text-white">
              <h3>Available on: Buy</h3>

              {info.watchproviders.buy.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>
        <div className="w-[80%] flex flex-col mt-10 text-white">
          <div className="">
            <h1 className="text-2xl mb-3 mt-5 ">TV Translated</h1>
            <p>{info.translations.join(", ")}</p>
          </div>
          <Link
            to="trailer"
            className=" mt-5 py-3 px-3 bg-[#6556CD] rounded-lg w-[150px] text-center"
          >
            <i className="ri-play-fill"></i> Play trailer
          </Link>
        </div>
      </div>

      {/* sesons part 4*/}
      <hr className="mt-10 mb-10 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-5xl font-semibold text-white ml-5">Seasons</h1>
      <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
        {info.detail.seasons.length > 0 ?
          info.detail.seasons.map((s, i) => (
            <div className="w-[15vh] mr-[8%]">
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] min-w-[25vh] h-[30vh] object-cover"
                src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
                alt=""
              />
              <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
                {s.name}
              </h1>
            </div>
          )) : <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">No Seasons Available</h1>}
      </div>
      {/* part5 */}
      <hr className="mt-10 mb-10 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-5xl font-semibold text-white ml-5">
        Recommendations & Similar tvs
      </h1>
      <Horizontalcards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default TvDetails;
