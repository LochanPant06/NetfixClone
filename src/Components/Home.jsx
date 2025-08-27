import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";

function Home() {
  document.title = "MOVIE APP";


  const [wallpaper, setWallpaper] = useState(null);   //for header
  const [trending, setTrending] = useState(null);    //for horizontal cards




  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get("/trending/all/day"); //treading us din ke liye hai unka data
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
      const { data } = await axios.get("/trending/all/day"); //treading us din ke liye hai unka data
      setTrending(data.results);
    } catch (error) {
      console.log("Error fetching wallpaper:", error);
    }
  };





  useEffect(() => {
    !wallpaper && GetHeaderWallpaper(); //agra wallpaper null hai to ye function chala do {!wallpaper ? GetHeaderWallpaper() : null;}
    !trending && GetTrending();
  }, []);

  // console.log(trending);






  return wallpaper && trending ? ( //agar treanding or wallpaer dono aa rahe hai tabhi ye load ho 
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden\">
        <Topnav />
        <Header data={wallpaper} />
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
