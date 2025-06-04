import React, { memo } from "react";
import { Heart } from "lucide-react";
import { genresIds } from "../../utils/Constants";
import { Link } from "react-router-dom";

const MovieCardSM = ({ movie,isHovered, handleHover, removeHover, index }) => {

  if(!movie){
    return;
  }
  const genresArray = movie.genres.map((genre)=>genresIds[genre])
  const genreString = genresArray.join(' | ')
  
  return (
  <Link to={`/watch?v=${movie.movieId}`}>
      <div
      onMouseEnter={() => handleHover(index)}
      onMouseLeave={removeHover}
      className="aspect-[12/16] relative rounded-xl overflow-hidden text-white cursor-pointer"
    >
      <div className="aspect-[12/16] h-full  rounded-xl overflow-hidden ">
        <img
          src={`https://image.tmdb.org/t/p/w342${movie.poster}`}
          className="h-full w-full object-cover"
          alt=""
          loading="lazy"
         
        />
      </div>
      <div
        className={`aspect-[12/16] hidden sm:flex rounded-xl absolute h-full w-full  flex-col justify-end items-center gap-1 md:gap-2 2xl:gap-3 px-3 py-3 bg-gradient-to-t from-black to-transparent ease duration-200 ${isHovered ? "top-0" : "top-full"}`}
      >
        <h2 className="text-xs sm:text-sm 2xl:text-md font-[my-font-Bd] text-center">
         {movie.title}
        </h2>
        <p className="text-[0.65rem] sm:text-xs 2xl:text-sm">
          {genreString}
        </p>
        <div className="flex items-center gap-2">
          <Heart size={20} fill="#D9232E" className="text-[#D9232E]" />
          <p className="text-[0.65rem] sm:text-xs 2xl:text-sm font-[my-font-Md]">
            {Math.round(movie.popularity)} M
          </p>
        </div>
      </div>
    </div>
  </Link>
  );
};

export default memo(
  MovieCardSM,
  (prev, next) => prev.isHovered == next.isHovered,
);
