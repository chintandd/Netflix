import { useState, memo } from "react";
import NanoExploreMovieCard from "./NanoExploreMovieCard";

const NanoExploreCards = memo(({ title, movies }) => {
  const [hover, setHover] = useState(null);

  function handleHover(movie) {
    setHover(movie);
  }

  function removeHover() {
    setHover(null);
  }



  if (movies.length == 0) {
    return (
      <div className="flex  flex-nowrap items-center h-32 overflow-hidden gap-3 md:gap-6 lg:h-40 xl:h-50 w-full py-4 md:py-6 px-5 md:px-15">
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-screen flex flex-col  text-white">
        <div className="flex flex-col gap-3 md:gap-6  h-32  lg:h-40 xl:h-50 w-full">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-[my-font-bd] px-5 md:px-15">
            {title}
          </h2>
          <div className="card-container  w-full   flex-1 min-h-0  flex justify-center relative ">
            <div className="absolute top-1/2 left-0 transform w-15 bg-gradient-to-r from-black/100 via-black/50 to-transparent h-[110%]  -translate-y-1/2  cursor-pointer  z-8 flex items-center  justify-center"></div>
            <div className="absolute top-1/2 right-0 transform w-15 bg-gradient-to-l from-black/100 via-black/50 to-transparent h-[110%]  -translate-y-1/2  cursor-pointer  z-8 flex items-center  justify-center"></div>
            <div className="w-full h-full flex flex-nowrap gap-2.5  overflow-x-auto scroll-hidden scroll-smooth">
              {movies.map((movie, index) => {
                return (
                  <NanoExploreMovieCard
                    key={movie.movieId}
                    index={index}
                    data={movie}
                    isHovered={hover == movie.movieId}
                    handleHover={handleHover}
                    removeHover={removeHover}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default NanoExploreCards;
