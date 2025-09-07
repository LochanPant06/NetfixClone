import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson } from "../Store/actions/personAction";
import { useEffect } from "react";
import { removeperson } from "../Store/reducers/personSlice";
import Loading from "../Components/Loading";
import Horizontalcards from "../Components/partials/HorizontalCards";
import Dropdown from "../Components/partials/Dropdown";

function PersonDetails() {
  const { pathname } = useLocation(); //ye hook hume current url ka path deta hai
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

  const info = useSelector((state) => state.person.info);

  const dispatch = useDispatch();

  const [category, setcategory] = useState("movie");
  // console.log(info);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    // console.log("Dispatched asyncloadperson with id:", id);
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="px-[10%] w-screen h-screen overflow-y-scroll text-zinc-100 bg-[#1F1E24]">
      {/* part 1 navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>
      {/* part 2 details */}
      <div className="w-full flex">
        {/* part2 left poster and details */}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[35vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              //ye link khud se search karke nikalne padte hai {tmdb image link search karo google pe }
              info.detail.profile_path
            }`}
            alt=""
          />
          {/* social media links */}
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
          <div className="text-2xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`} //facebook link
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`} //instagram link
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`} //twitter link
            >
              <i className="ri-twitter-fill"></i>
            </a>
          </div>

          {/* personal information*/}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Personal Information
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold my-5">
            Known For
          </h1>
          <h1 className="text-zinc-400 ">{info.detail.known_for_department}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold my-3">Gender</h1>
          <h1 className="text-zinc-400 ">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold my-5">BirthDay</h1>
          <h1 className="text-zinc-400 ">{info.detail.birthday}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold my-5">
            Known For
          </h1>
          <h1 className="text-zinc-400 ">{info.detail.known_for_department}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold my-5">DeathDay</h1>
          <h1 className="text-zinc-400 ">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold my-5">
            Place Of Birth
          </h1>
          <h1 className="text-zinc-400 ">
            {info.detail.place_of_birth
              ? info.detail.place_of_birth
              : "Unknown"}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold my-5">
            Also Known As
          </h1>
          <h1 className="text-zinc-400 ">
            {info.detail.also_known_as
              ? info.detail.also_known_as.join(", ")
              : "Unknown"}
          </h1>
        </div>
        {/* part 3  right details and information */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl text-zinc-400 font-black my-5">
            {info.detail.name}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold my-5">
            Biography
          </h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>

          <h1 className="text-lg text-zinc-400 font-semibold my-5 mt-5">
            Famous For
          </h1>
          <Horizontalcards data={info.combinedCredits.cast} />
          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
          <div className="w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,0.3)] border-2 border-zinc-700 p-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={c.id || i}
                className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer "
              >
                <Link to={`/${category}/details/${c.id}`} className="">
                  <span>
                    <p  >
                      {" "}
                      {c.name || c.title || c.original_name || c.original_title}
                    </p>
                  </span>
                  <span className="block ml-5 mt-3">
                    {c.character && `Character Name : ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default PersonDetails;
