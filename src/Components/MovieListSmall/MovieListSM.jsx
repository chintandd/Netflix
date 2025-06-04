import  {useState } from "react";
import MovieCardSM from "./MovieCardSM";
import { useSelector } from "react-redux";

const MoviesListSM = ({pageNo}) => {

  const movies = useSelector((store)=>store.movie.allMovies[pageNo]) || []
  const [hover, setHover] = useState(null);

  function handleHover(index) {
    setHover(index);
  }

  function removeHover() {
    setHover(null);
  }

  if(movies.length == 0){
    return <div className="bg-black flex h-screen w-full justify-center items-center">
      <div className="loader2"></div>
      

      </div>

  }

  return (
    <div className=" w-full">
      <div className="main-container h-full w-full grid gap-3 px-7 sm:gap-4 sm:px-14  md:px-20 lg:px-25 xl:px-35 2xl:px-50  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  py-5">
        {movies.map((movie,index) => {
          return (
            <MovieCardSM
              key={movie.movieId}
              index={index}
              isHovered={hover == index}
              handleHover={handleHover}
              removeHover={removeHover}
              movie={movie}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MoviesListSM;
