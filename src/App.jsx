import React from "react";
import Home from "./Components/Home";
import Sidenav from "./Components/partials/Sidenav";
import { Route, Routes } from "react-router-dom";
import Trending from "./Components/Trending";
import Popular from "./Components/Popular";
import Movie from "./Components/Movie";
import Tvshows from "./Components/Tvshows";
import People from "./Components/People";
import MovieDetails from "./Components/MovieDetails";
import TvDetails from "./Components/TvDetails";
import PersonDetails from "./Components/PersonDetails";
import Trailer from "./Components/partials/Trailer";
import NotFound from "./Components/partials/NotFound";
function App() {
  return (
    <div className=" bg-[#1F1E24] flex ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />

        <Route path="/movie" element={<Movie />}></Route>
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        {/* <Route path="/tvshows" element={<Tvshows />} /> */}
        <Route path="/tvshows" element={<Tvshows />} />

        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        {/* <Route path="/people" element={<People />} /> */}

        <Route path="/people" element={<People />}></Route>
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
