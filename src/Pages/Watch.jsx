import useWatchScreen from "../APIs/useWatchScreen";
import PlayScreen from "./PlayScreen";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearWatchScreenMovie } from "../../Redux/movieSlice";
import useRelatedMovies from "../APIs/useRelatedMovies";
import MoviesListLong from "../Components/MovieListLong/MoviesListLong";

const Watch = () => {
  const dispatch = useDispatch();
  const watchScreenMovie = useSelector((store) => store.movie.watchScreenMovie);
  const relatedMovies = useSelector((store) => store.movie.relatedMovies);
  const isAuth = useSelector((store) => store.auth.isAuth);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("v");

  useWatchScreen(movieId);
  useRelatedMovies();

  useEffect(() => {
    return () => {
      dispatch(clearWatchScreenMovie());
    }
  }, [movieId]);

  useEffect(() => {
    if (isAuth === null) {
      const intendedUrl = location.pathname + location.search;
      localStorage.setItem("redirectAfterLogin", intendedUrl);
      navigate("/home");
    } else if (!movieId) {
      navigate("/login");
    }
  }, [isAuth]);

  if (!watchScreenMovie) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center px-5 md:px-10 py-5">
        <div className="bg-[#ffffff22] h-[32vh] md:h-[60vh] lg:h-[70vh] w-full rounded-2xl"></div>
        <div className="flex flex-col  h-[23vh] md:h-[40vh] lg:h-[30vh] w-full justify-evenly  ">
          <div className="h-8 md:h-10 w-1/3 bg-[#ffffff22] rounded-r-full rounded-l-full"></div>
          <div className="h-8 md:h-10 w-1/2 bg-[#ffffff22] rounded-r-full rounded-l-full"></div>
          <div className="h-16 md:h-20 w-3/4 bg-[#ffffff22] rounded-r-full rounded-l-full"></div>
         
        </div>
         <div className=" bg-[#ffffff22] h-5 md:h-0 w-full  rounded-r-full rounded-l-full"></div>
         <div className=" bg-[#ffffff22] h-65 mt-5 md:mt-0 md:h-0 w-full rounded-2xl"></div>

      </div>
    );
  }
  const genresString = watchScreenMovie?.genres.join(", ");

  return (
    <div className="min-h-screen bg-black w-full text-white font-[my-font-Rg] overflow-hidden ">
      <PlayScreen
       data={watchScreenMovie}
      />
      <div className="flex flex-col gap-3  px-5 md:px-10 lg:px-15 xl:px-20 py-12 lg:mb-10 xl:mb-15">
        <div className="movie-details w-full flex flex-col sm:flex-row gap-2   justify-center">
          <div className="w-full  flex flex-col gap-2 md:gap-2 lg:gap-3 xl:gap-4">
            <p className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl text-[#ffffffbd]">
              Released on :{" "}
              <span className=" text-white font-[my-font-Md] ">
                {watchScreenMovie?.release_date}
              </span>
            </p>
            <p className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl text-[#ffffffbd]">
              Name :{" "}
              <span className=" text-white font-[my-font-Md] ">
                {watchScreenMovie?.title}
              </span>
            </p>
          </div>
          <div className="w-full sm:w-1/3  flex flex-col gap-2 lg:gap-3 xl:gap-4  items-start  ">
            <p className="text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-[#ffffffbd]">
              Genres :{" "}
              <span className=" text-white font-[my-font-Md] ">
                {genresString}
              </span>
            </p>
            <p className="text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-[#ffffffbd]">
              Popularity :{" "}
              <span className=" text-white font-[my-font-Md] ">
                {Math.round(watchScreenMovie?.popularity)} M
              </span>
            </p>
          </div>
        </div>
        <p className="w-full sm:w-1/2 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-[#ffffffbd]">
          {watchScreenMovie?.overview}
        </p>
      </div>
      <MoviesListLong title={"Related Movies"} movies={relatedMovies} />
    </div>
  );
};

export default Watch;
