import React from "react";
import { Link } from "react-router-dom";
import { genresIds } from "../../utils/Constants";

const MovieListLongCard = ({ movie }) => {
  let genresArray = movie?.genres.map((genre) => genresIds[genre]);
  let genresString = genresArray.splice(0, 3).join(" | ");


  return (
    <Link to={`/watch?v=${movie.movieId}`}>
      <div className="item-list w-full h-25 sm:h-32 md:h-35 lg:h-40 xl:h-50 bg-[#161616] flex p-1 sm:p-2 md:p-3 rounded-xl">
        <div className="image-div h-full aspect-video overflow-hidden shrink-0">
          <img
            className="object-cover aspect-video  h-full  w-full rounded-xl"
            src={`https://image.tmdb.org/t/p/w342${movie.poster}`}
            alt=""
          />
        </div>
        <div className="details-div flex flex-col pl-3 md:pl-5 justify-center gap-0.5 sm:gap-2">
          <p className="text-[0.70rem] leading-tight sm:text-sm md:text-md lg:text-lg xl:text-xl font-[my-font-Bd] line-clamp-1">
            {movie.title}
          </p>
          <p className="text-[0.60rem] sm:text-xs md:text-sm lg:text-md xl:text-lg font-[my-font-Md]">
            Genres : <span className="">{genresString}</span>
          </p>
          <p className="text-[0.60rem] sm:text-xs md:text-sm lg:text-md xl:text-lg font-[my-font-Md]">
            Year : <span className="">{movie.year}</span>
          </p>
          <p className="text-[0.60rem] sm:text-xs md:text-sm lg:text-md xl:text-lg font-[my-font-Md]">
            Popularity : <span className="">{movie.popularity} M</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieListLongCard;
