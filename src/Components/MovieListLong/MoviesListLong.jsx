import MovieListLongCard from "./MovieListLongCard";

const MoviesListLong = ({ movies,title }) => {
  if (movies.length == 0) return null;

  return (
    <div className=" w-full  text-white flex justify-center items-center">
      <div className="h-full w-[96vw]  md:w-[80vw] lg:w-[72vw] xl:w-[65vw]  ">
        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-[my-font-Bd] text-center pb-4  lg:pb-5 xl:pb-8">
          {title}
        </h1>
        <div className="list-container flex flex-col gap-2 md:gap-3 h-auto w-full  overflow-hidden">
          {movies.map((data) => {
            return <MovieListLongCard key={data.movieId} movie={data} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MoviesListLong;
