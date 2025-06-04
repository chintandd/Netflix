import { useEffect } from "react";
import { OPTIONS } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../../Redux/movieSlice";

const useUpcomingMovies = () => {
  const upcomingMovies = useSelector((store) => store.movie.popularMovies);

  const dispatch = useDispatch();

  useEffect(() => {
    if (upcomingMovies.length != 0) return;
    upcomingMoviesFetch();
    console.log("upcoming movies");
  }, []);

  async function upcomingMoviesFetch() {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      OPTIONS,
    );
    const json = await data.json();

    const arr = [];

    await Promise.all(
      json.results.map(async (movie) => {
        const images = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/images`,
          OPTIONS,
        );
        const json2 = await images.json();
        const poster = json2.backdrops.filter(
          (i) => i.iso_639_1 === "en" && i.file_path,
        )[0]?.file_path;
        poster &&
          arr.push({
            movieId: movie.id,
            posterImage: poster,
            title: movie.title,
          });
      }),
    );

    dispatch(addUpcomingMovies(arr));
  }
};

export default useUpcomingMovies;
