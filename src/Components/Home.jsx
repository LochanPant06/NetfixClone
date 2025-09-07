import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";
import Dropdown from "./partials/Dropdown";
import { data } from "react-router-dom";

function Home() {
  document.title = "MOVIE APP";

  const [wallpaper, setWallpaper] = useState(null); //for header
  const [trending, setTrending] = useState(null); //for horizontal cards
  const [category, setCategory] = useState("all");
  // console.log(category);

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`); //treading us din ke liye hai unka data
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomdata);
    } catch (error) {
      console.log("Error fetching wallpaper:", error);
    }
  };
  // console.log(wallpaper);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`); //treading us din ke liye hai unka data
      setTrending(data.results);
      // console.log(data);
    } catch (error) {
      console.log("Error fetching wallpaper:", error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
    GetTrending(); // <-- Always call on category change
  }, [category]);

  // console.log(trending);

  return wallpaper && trending ? ( //agar treanding or wallpaer dono aa rahe hai tabhi ye load ho
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden\">
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex justify-between p-5">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>

          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => {   // dropdown mai agar ye click hua to yaha ye function run hoga 
              setCategory(e.target.value);
            }}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <>
      <Loading />
    </>
  );
}

export default Home;
