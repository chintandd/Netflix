import { Link } from "react-router-dom";
import { memo } from "react";

const NanoExploreMovieCard = ({
  data,
  isHovered,
  handleHover,
  removeHover,
  index,
}) => {
  return (
    <Link to={`/watch?v=${data.movieId}`}>
      <div
        onMouseEnter={() => handleHover(data.movieId)}
        onMouseLeave={removeHover}
        className={`item aspect-video relative h-full rounded-xl  overflow-hidden shrink-0 cursor-pointer ${index == 0 && "ml-5 md:ml-15"}`}
      >
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/w342${data.posterImage}`}
          loading="lazy"
          alt={data.movieId}
        />
        <div
          className={`absolute bg-gradient-to-t from-black to-transparent w-full -bottom-[100%] h-full flex items-end justify-center ease duration-200 ${isHovered && "bottom-0"}`}
        >
          <p className="font-[my-font-Bd] text-xs md:text-md lg:text-lg pb-3 text-center">
            {data.title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default memo(
  NanoExploreMovieCard,
  (prev, next) => prev.isHovered == next.isHovered,
);
