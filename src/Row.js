import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // a shippet of code which run based on a specific condition/variable
  useEffect(() => {
    // if [], run once when the row loads, and dont run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // "https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213"
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    // if opened close it
    if (trailerUrl) {
      setTrailerUrl("");
    } else if (movie.id == "99966") {
      return setTrailerUrl("IN5TD4VRcSM");
    } else if (movie.id == "93405") {
      //squid game
      return setTrailerUrl("sH4Y450PSVM");
    } else if (movie.id == "77169") {
      return setTrailerUrl("LcDQqGJG8pA"); //cobra kai
    } else if (movie.id == "96777") {
      return setTrailerUrl("Af_Hj0MDBBQ"); //the silent sea
    } else if (movie.id == "134949") {
      return setTrailerUrl("BJYJksHREIc"); //Rebelde
    } else if (movie.id == "94605") {
      return setTrailerUrl("4Ps6nV4wiCE"); //arcane
    } else if (movie.id == "81356") {
      return setTrailerUrl("zmgYlYw7Uwk"); //arcane
    } else {
      // get the full url but only need the parameter after v=?
      //https://www.youtube.com/watch?v=rUt5gnQjj04
      movieTrailer(
        movie?.name ||
          movie?.title ||
          movie?.original_name ||
          movie.overview ||
          ""
      )
        .then((url) => {
          const temp = new URL(url).search;
          const urlParams = new URLSearchParams(temp); // get the part after "?"

          setTrailerUrl(urlParams.get("v")); //rUt5gnQjj04
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
