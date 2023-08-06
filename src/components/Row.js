import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");
  const [loadmovie,setloadmovie] = useState("")

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      console.table(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleTrailer = (movie)=>{
    settrailerUrl("")
        setloadmovie("")
    if(loadmovie == (movie?.title || movie?.name)){
        settrailerUrl("")
        setloadmovie("")
    }
    else{
      settrailerUrl("")
      setloadmovie("")
      // console.log("MovieName: ",movie.title)
      setloadmovie(`${movie?.title || movie?.name}`)
       movieTrailer(movie?.title ||movie?.name || "",(err,res)=>{
          // console.log("res: ",res)
          // console.log("err: ",err)
          if(res){
            const urlParams =new URLSearchParams(new URL(res).search);
             settrailerUrl(urlParams.get('v'));
          }
          else if(err){
            console.log(err)
          }
       })
      // .then((url)=>{
        
      //   const urlParams =new URLSearchParams(new URL(url).search);
      //   settrailerUrl(urlParams.get('v'));
      // }).catch(err=>console.log(err))
    }
  }

  return (
    <div className="row">
      <h1>{title}</h1>

      <div className="row_posters">
        {movies.map((movie) =>
          movie.id != (2051 && 645488 ) ? (
            <img
              src={`${baseURL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              key={movie.id}
              className={`row_poster_img ${isLargeRow && "row_large_poster"} ${loadmovie == (movie?.title || movie?.name)? "activemovie" : ""}`}
              onClick={()=>handleTrailer(movie)}
              />
          ) : null
        )}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
